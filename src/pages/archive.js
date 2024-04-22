import useSentenceSearch from '../hooks/archive/useSentenceSearch';
import TokenButton from '../components/archive/tokenButton';
import Sentence from '../components/archive/sentence';
import Pagination from '../components/archive/pagination';
import Loading from '../components/design/Loading';
import { useState } from 'react';

function Archive() {
  const {
    sentences,
    page,
    totalCount,
    searchTokens,
    isLoading,
    addSearchToken,
    removeSearchToken,
    changePage,
  } = useSentenceSearch();
  const [input, setInput] = useState('');

  return (
    <div className="flex-fill m-3 d-flex flex-column h-100">
      <div className="row">
        <div className="col-md-5 m-auto border-end p-2">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="검색어"
              value={input}
              onChange={(e) => {
                console.log('changes');
                setInput(e.target.value);
              }}
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <div
              className="m-1 ms-2 cursor2Pointer"
              onClick={() => {
                addSearchToken(input);
                setInput('');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-md-7 m-auto p-2">
          {searchTokens.length !== 0 ? (
            searchTokens.map((token) => (
              <TokenButton
                key={token}
                token={token}
                onClick={() => removeSearchToken(token)}
              />
            ))
          ) : (
            <div style={{ fontSize: '0.8em' }}>
              문장을 검색할 수 있습니다. 검색어를 입력 후 '+'를 눌러주세요.
              <br />
              <span style={{ fontSize: '0.785em' }}>
                * 여러 검색어를 입력할 수 있습니다.
              </span>
              <br />
              <span style={{ fontSize: '0.785em' }}>
                ** 다양한 검색 결과를 표시하기 위해 매주 검색 결과의 순서가
                달라집니다.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-fill flex-column justify-content-evenly p-2">
        {isLoading ? (
          <Loading />
        ) : (
          sentences.map((sentence) => (
            <Sentence
              tokens={searchTokens}
              key={sentence.content}
              sentence={sentence.content}
              semester={sentence.semester}
              title={sentence.title}
              author={sentence.author}
              link={sentence.link}
            />
          ))
        )}
      </div>
      {searchTokens.length !== 0 ? (
        <div className="d-flex justify-content-end">
          <Pagination
            curPageNum={page}
            totalCount={totalCount}
            onPageClick={(p) => changePage(p)}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Archive;
