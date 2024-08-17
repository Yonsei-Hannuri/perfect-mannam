import { create } from 'zustand';

type paragraph = {
  copy: string;
  selected: boolean;
  content: string | null;
};

type ParagraphState = {
  paragraphs: paragraph[];
};

type ParagraphAction = {
  addCopy: (copy: string) => void;
  removeCopy: (copy: string) => void;
  togglSelect: (copy: string) => void;
  changeOrder: (fromIndex: number, toIndexBefore: number) => void;
  setParagraph: (copy: string, content: string) => void;
};

export const useParagraph = create<ParagraphState & ParagraphAction>((set) => ({
  paragraphs: [],
  addCopy: (copy: string) =>
    set((state) => {
      return {
        paragraphs: [
          ...state.paragraphs,
          { copy: copy, selected: false, content: null },
        ],
      };
    }),
  removeCopy: (copy: string) =>
    set((state) => {
      return { paragraphs: state.paragraphs.filter((e) => e.copy !== copy) };
    }),
  togglSelect: (copy: string) =>
    set((state) => {
      const targetCopy = state.paragraphs.filter((e) => e.copy === copy)[0];
      targetCopy.selected = !targetCopy.selected;
      return { paragraphs: [...state.paragraphs] };
    }),
  changeOrder: (fromIndex: number, toIndexBefore: number) =>
    set((state) => {
      const paragraphs = state.paragraphs;
      if (fromIndex < toIndexBefore) {
        paragraphs.splice(toIndexBefore, 0, paragraphs[fromIndex]);
        paragraphs.splice(fromIndex, 1);
      } else if (fromIndex > toIndexBefore) {
        paragraphs.splice(toIndexBefore, 0, paragraphs[fromIndex]);
        paragraphs.splice(fromIndex + 1, 1);
      }
      return { paragraphs: [...paragraphs] };
    }),
  setParagraph: (copy: string, content: string) =>
    set((state) => {
      const paragraph = state.paragraphs.find((e) => e.copy === copy)!;
      paragraph.content = content;
      return { paragraphs: [...state.paragraphs] };
    }),
}));
