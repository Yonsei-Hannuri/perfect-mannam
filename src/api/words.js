import client from './client';

export const GET_SESSION_WORDS = async (sessionId) => {
  const res = await client.get(`session/${sessionId}/word/`);
  return res.data;
};
