import { useState } from 'react';

export default function () {
  const [page, setPage] = useState<number>(0);
  return (
    <>
      <button onClick={() => setPage((prev) => prev - 1)}>{'<'}</button>
      <button onClick={() => setPage((prev) => prev + 1)}>{'>'}</button>
    </>
  );
}
