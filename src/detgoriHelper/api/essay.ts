import { essayClient } from './client';

type essay = {
  essayId: number;
  createdDt: string;
  updatedDt: string;
  essayTitle: string;
  owner: string;
  completeYn: string;
  subjectId: string;
};

export const GET_ESSAYS = () => essayClient.get<essay[]>('/');

export const CREATE_ESSAY = (subject_id: string) =>
  essayClient.post<essay>('/', { subject_id });

export const DELETE_ESSAY = (essayId: number) =>
  essayClient.delete(`${essayId}/`);

export const COMPLETE_ESSAY = (essayId: number) =>
  essayClient.put<essay>(`${essayId}/?action=complete`, {
    complete: 'true',
  });

export const GET_ESSAY_TITLE_RECOMMEND = (essayId: number) =>
  essayClient.get<string[]>(`${essayId}/?action=title-recommend`);

export const SAVE_ESSAY_TITLE = (essayId: number, title: string) =>
  essayClient.put<essay>(`${essayId}/?action=title`, { title });
