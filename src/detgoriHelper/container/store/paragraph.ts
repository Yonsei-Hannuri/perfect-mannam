import {
  CHNAGE_PARAGRAPH_ORDER,
  CREATE_PARAGRAPH,
  DELETE_PARAGRAPH,
  GET_PARAGRAPHS,
  MANUAL_UPDATE_PARAGRAPH,
  REGENERATE_PARAGRAPH,
} from '../../api/paragraph';
import { create } from 'zustand';
import paragraph from '../paragraph';
import { Fetch } from './common';

type paragraph = {
  id: number;
  content: string;
  loading: boolean;
  error: string | null;
};

type ParagraphState = {
  paragraphs: paragraph[];
};

type ParagraphAction = {
  addParagraph: (paragraph: string) => void;
  removeParagraph: (id: number) => void;
  changeOrder: (id: number, toIndexBefore: number) => void;
  regenerateParagraph: (id: number, command: string) => void;
  modifyParagraph: (id: number, modified: string) => void;
};

const saveAndUpdate = async (
  essayId: number,
  _paragraphContent: string,
  placeBefore: number,
  _callback: (paragraphContent: string, paragraphId: number) => void,
) => {
  const res = await CREATE_PARAGRAPH(essayId, {
    paragraphContent: _paragraphContent,
    placeBefore,
  });
  const {
    data: { paragraphContent },
  } = await REGENERATE_PARAGRAPH(
    essayId,
    res.data.paragraphId,
    '이 문단에 내용을 추가해줘',
  );
  _callback(paragraphContent, res.data.paragraphId);
};

const essayId = {
  id: 0,
  retrieve: function () {
    return this.id;
  },
  save: function (id: number) {
    this.id = id;
  },
};
export const useParagraphByEssay = create<
  ParagraphState & ParagraphAction & Fetch
>((set) => ({
  paragraphs: [],
  loading: true,
  error: null,
  fetch: async (_essayId: number) => {
    essayId.save(_essayId);
    const res = await GET_PARAGRAPHS(_essayId);
    const paras = res.data;
    set(() => {
      return {
        essayId,
        paragraphs: paras.map((para) => {
          return {
            id: para.paragraphId,
            content: para.paragraphContent,
            loading: false,
            error: null,
          };
        }),
      };
    });
  },
  addParagraph: (paragraph: string) =>
    set((state) => {
      const tempId = Date.now();
      saveAndUpdate(
        essayId.retrieve(),
        paragraph,
        state.paragraphs.length,
        (newParagraphContent, paragraphId) => {
          set((state) => {
            const targetPara = state.paragraphs.find(
              (para) => para.id === tempId,
            )!;
            targetPara.content = newParagraphContent;
            targetPara.loading = false;
            targetPara.id = paragraphId;
            return {
              paragraphs: [...state.paragraphs],
            };
          });
        },
      );
      return {
        paragraphs: [
          ...state.paragraphs,
          { content: paragraph, id: tempId, loading: true, error: null },
        ],
      };
    }),
  removeParagraph: async (id: number) => {
    set((state) => {
      const para = state.paragraphs.find((e) => e.id === id)!;
      para.loading = true;
      return { paragraphs: [...state.paragraphs] };
    });
    try {
      await DELETE_PARAGRAPH(essayId.retrieve(), id);
      set((state) => {
        return { paragraphs: state.paragraphs.filter((e) => e.id !== id) };
      });
    } catch {
      set((state) => {
        const para = state.paragraphs.find((e) => e.id === id)!;
        para.loading = false;
        para.error = '단락 삭제에 실패했습니다.';
        return { paragraphs: [...state.paragraphs] };
      });
    }
  },
  changeOrder: async (id: number, toIndexBefore: number) => {
    set((state) => {
      return { loading: true };
    });
    try {
      await CHNAGE_PARAGRAPH_ORDER(essayId.retrieve(), id, toIndexBefore);
      set((state) => {
        const paragraphs = state.paragraphs;
        const fromIndex = state.paragraphs.findIndex((e) => e.id === id)!;
        if (fromIndex < toIndexBefore) {
          paragraphs.splice(toIndexBefore, 0, paragraphs[fromIndex]);
          paragraphs.splice(fromIndex, 1);
        } else if (fromIndex > toIndexBefore) {
          paragraphs.splice(toIndexBefore, 0, paragraphs[fromIndex]);
          paragraphs.splice(fromIndex + 1, 1);
        }
        return { paragraphs: [...paragraphs], loading: false };
      });
    } catch {
      set((state) => {
        return { loading: false, error: '순서 변경에 실패했습니다.' };
      });
    }
  },
  regenerateParagraph: async (id: number, command: string) => {
    set((state) => {
      const para = state.paragraphs.find((e) => e.id === id)!;
      para.loading = true;
      return { paragraphs: [...state.paragraphs] };
    });
    try {
      const {
        data: { paragraphContent },
      } = await REGENERATE_PARAGRAPH(essayId.retrieve(), id, command);
      set((state) => {
        const paragraph = state.paragraphs.find((e) => e.id === id)!;
        paragraph.content = paragraphContent;
        paragraph.loading = false;
        return { paragraphs: [...state.paragraphs] };
      });
    } catch {
      set((state) => {
        const para = state.paragraphs.find((e) => e.id === id)!;
        para.loading = false;
        para.error = '단락 생성에 실패했습니다.';
        return { paragraphs: [...state.paragraphs] };
      });
    }
  },
  modifyParagraph: async (id: number, modified: string) => {
    set((state) => {
      const para = state.paragraphs.find((e) => e.id === id)!;
      para.loading = true;
      return { paragraphs: [...state.paragraphs] };
    });
    try {
      const {
        data: { paragraphContent },
      } = await MANUAL_UPDATE_PARAGRAPH(essayId.retrieve(), id, modified);
      set((state) => {
        const paragraph = state.paragraphs.find((e) => e.id === id)!;
        paragraph.content = paragraphContent;
        paragraph.loading = false;
        return { paragraphs: [...state.paragraphs] };
      });
    } catch {
      set((state) => {
        const para = state.paragraphs.find((e) => e.id === id)!;
        para.loading = false;
        para.error = '단락 수정 실패했습니다.';
        return { paragraphs: [...state.paragraphs] };
      });
    }
  },
}));
