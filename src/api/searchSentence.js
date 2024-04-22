import client from './client';

export const SEARCH_SENTENCE_BY_TOKENS = async (tokens, page) => {
  const res = await client.post('sentenceSearch/', { tokens, page: page - 1 });
  return res.data;
};
