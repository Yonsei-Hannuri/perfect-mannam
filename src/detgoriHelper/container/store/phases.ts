import { create } from 'zustand';

type phase = {
  copy: string;
  selected: boolean;
  content: string | null;
};

type PhaseState = {
  phases: phase[];
};

type PhaseAction = {
  addCopy: (copy: string) => void;
  removeCopy: (copy: string) => void;
  togglSelect: (copy: string) => void;
  changeOrder: (fromIndex: number, toIndexBefore: number) => void;
  setPhase: (copy: string, content: string) => void;
};

export const usePhase = create<PhaseState & PhaseAction>((set) => ({
  phases: [],
  addCopy: (copy: string) =>
    set((state) => {
      return {
        phases: [
          ...state.phases,
          { copy: copy, selected: false, content: null },
        ],
      };
    }),
  removeCopy: (copy: string) =>
    set((state) => {
      return { phases: state.phases.filter((e) => e.copy !== copy) };
    }),
  togglSelect: (copy: string) =>
    set((state) => {
      const targetCopy = state.phases.filter((e) => e.copy === copy)[0];
      targetCopy.selected = !targetCopy.selected;
      return { phases: [...state.phases] };
    }),
  changeOrder: (fromIndex: number, toIndexBefore: number) =>
    set((state) => {
      const phases = state.phases;
      if (fromIndex < toIndexBefore) {
        phases.splice(toIndexBefore, 0, phases[fromIndex]);
        phases.splice(fromIndex, 1);
      } else if (fromIndex > toIndexBefore) {
        phases.splice(toIndexBefore, 0, phases[fromIndex]);
        phases.splice(fromIndex + 1, 1);
      }
      return { phases: [...phases] };
    }),
  setPhase: (copy: string, content: string) =>
    set((state) => {
      const phase = state.phases.find((e) => e.copy === copy)!;
      phase.content = content;
      return { phases: [...state.phases] };
    }),
}));
