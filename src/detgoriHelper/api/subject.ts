import { client } from './client';

type subject = {
  subjectId: string;
  createdDt: string;
  updatedDt: string;
  subjectPurpose: string;
  subjectContent: string;
  subjectTitle: string;
};

export const GET_SUBJECT = (subjectId: string) =>
  client.get<subject>(`subject/${subjectId}/`);
