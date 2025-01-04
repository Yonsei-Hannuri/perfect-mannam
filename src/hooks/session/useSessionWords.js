import { useState } from 'react';
import useOnMountAsync from '../common/useOnMountAsync';
import { GET_SESSION_WORDS } from '../../api/words';

const useSessionWords = (sessionId) => {
  const [sessionWords, setSessionWords] = useState([]);
  useOnMountAsync(async () => {
    setSessionWords(await GET_SESSION_WORDS(sessionId));
  });
  return {
    sessionWords,
  };
};

export default useSessionWords;
