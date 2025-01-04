import client from './client';

export const SEARCH_SENTENCE_BY_TOKENS = async (tokens, page, pageSize = 7) => {
  const res = await client.get(
    `sentence/?tokens=${tokens.join(',')}&page=${page}&page_size=${pageSize}`,
  );
  return res.data;
};
