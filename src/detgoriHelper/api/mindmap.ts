import { essayClient } from './client';

type edge = {
  keyword1nm: string;
  keyword2nm: string;
};

export const GET_ESSAY_MINDMAP = (essayId: string) =>
  essayClient.get<edge[]>(`${essayId}/mindmap/`);

export const UPDATE_ESSAY_MINDMAP = (
  essayId: string,
  edges: { keyword1: string; keyword2: string }[],
) => essayClient.post<edge[]>(`${essayId}/mindmap/`, edges);
