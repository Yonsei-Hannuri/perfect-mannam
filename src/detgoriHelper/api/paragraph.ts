import { essayClient } from './client';

type paragraph = {
  paragraphId: number;
  createdDt: string;
  updatedDt: string;
  paragraphContent: string;
  order: number;
  essayId: number;
};

export const GET_PARAGRAPHS = (essayId: string) =>
  essayClient.get<paragraph[]>(`${essayId}/paragraph/`);

export const CREATE_PARAGRAPH = (
  essayId: string,
  paragraph: { paragraphContent: string; placeBefore: number },
) => essayClient.post<paragraph>(`${essayId}/paragraph/`, paragraph);

export const DELETE_PARAGRAPH = (essayId: string, paragraphId: string) =>
  essayClient.delete(`${essayId}/paragraph/${paragraphId}/`);

export const REGENERATE_PARAGRAPH = (
  essayId: string,
  paragraphId: string,
  command: string,
) =>
  essayClient.put<paragraph>(
    `${essayId}/paragraph/${paragraphId}/?action=regenerate`,
    {
      command,
    },
  );

export const MANUAL_UPDATE_PARAGRAPH = (
  essayId: string,
  paragraphId: string,
  content: string,
) =>
  essayClient.put<paragraph>(
    `${essayId}/paragraph/${paragraphId}/?action=manual`,
    {
      content,
    },
  );

export const CHNAGE_PARAGRAPH_ORDER = (
  essayId: string,
  paragraphId: string,
  placeBefore: number,
) =>
  essayClient.put<paragraph>(
    `${essayId}/paragraph/${paragraphId}/?action=order`,
    {
      placeBefore,
    },
  );
