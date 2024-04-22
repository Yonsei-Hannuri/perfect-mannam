import { useState } from 'react';

const Pagination = ({
  curPageNum,
  totalCount,
  countByPage = 5,
  onPageClick,
}) => {
  const sectionSize = 5;
  const [section, setSection] = useState(Math.ceil(curPageNum / sectionSize));
  const lastPage = Math.ceil(totalCount / countByPage);
  const sectionStartPage = (section - 1) * sectionSize + 1;
  const pages = [0, 1, 2, 3, 4]
    .map((e) => e + sectionStartPage)
    .filter((e) => e > 0 && e <= lastPage);
  return (
    <div style={{ width: '300px' }}>
      <span className="fw-light" style={{ fontSize: '0.85em' }}>
        총 {totalCount}개의 문장이 검색되었습니다.
      </span>
      <nav>
        <ul className="pagination pagination-md m-0">
          <li
            className="page-item cursor2Pointer"
            onClick={() => setSection(section > 1 ? section - 1 : section)}
          >
            <span className="page-link" aria-hidden="true">
              {section !== 1 ? '«' : '•'}{' '}
            </span>
          </li>
          {pages.map((pageNum) => (
            <li
              key={pageNum}
              className={
                'page-item cursor2Pointer ' +
                (pageNum === curPageNum ? 'active' : '')
              }
              onClick={() => onPageClick(pageNum)}
              aria-current="page"
            >
              <span className="page-link">{pageNum}</span>
            </li>
          ))}
          {sectionSize * section < lastPage && (
            <li
              className="page-item cursor2Pointer"
              onClick={() =>
                setSection(
                  sectionSize * section < lastPage ? section + 1 : section,
                )
              }
            >
              <span className="page-link" aria-hidden="true">
                &raquo;
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
