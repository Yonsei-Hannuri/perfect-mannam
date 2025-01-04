import { useState } from 'react';
import { SEARCH_SENTENCE_BY_TOKENS } from '../../api/searchSentence';

const useSentenceSearch = () => {
  const [sentences, setSentences] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTokens, setSearchTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSearchResult = async (tokens, page) => {
    if (tokens.length === 0) {
      setSentences([]);
      setPage(1);
      setTotalCount(0);
      return;
    }
    setIsLoading(true);
    const searchResult = await SEARCH_SENTENCE_BY_TOKENS(tokens, page);
    setSentences(searchResult.results);
    setTotalCount(searchResult.count);
    setPage(page);
    setIsLoading(false);
  };

  const addSearchToken = (token) => {
    const tokens = [...searchTokens, token];
    setSearchTokens(tokens);
    updateSearchResult(tokens, 1);
  };

  const removeSearchToken = (token) => {
    const tokens = searchTokens.filter((t) => t !== token);
    setSearchTokens(tokens);
    updateSearchResult(tokens, 1);
  };

  const changePage = (npage) => {
    if (npage === page) return;
    setPage(npage);
    updateSearchResult(searchTokens, npage);
  };

  return {
    sentences,
    page,
    totalCount,
    searchTokens,
    isLoading,
    addSearchToken,
    removeSearchToken,
    changePage,
  };
};

export default useSentenceSearch;
