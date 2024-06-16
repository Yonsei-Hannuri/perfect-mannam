import { ReactElement, useState } from 'react';

export default function ({
  children,
  onDragEnd,
}: {
  children: ReactElement[];
  onDragEnd: (fromIndex: number, toIndexBefore: number) => void;
}) {
  const [fromIndex, setFromIndex] = useState(-1);
  const [toIndexBefore, setToIndexBefore] = useState(-1);

  return (
    <div
      onDragEnd={(e) => {
        e.preventDefault();
        onDragEnd(fromIndex, toIndexBefore);
        setFromIndex(-1);
        setToIndexBefore(-1);
      }}
    >
      {children.map((child, idx) => (
        <div key={idx}>
          <div
            style={{
              border: 'solid black 2px',
              margin: 10,
              height: 10,
              backgroundColor: idx === toIndexBefore ? 'red' : 'black',
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setToIndexBefore(idx);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setToIndexBefore(-1);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
          />
          <div
            draggable
            onDragStart={(e) => {
              setFromIndex(idx);
              setToIndexBefore(-1);
            }}
          >
            {child}
          </div>
        </div>
      ))}
      <div
        style={{
          border: 'solid black 2px',
          margin: 10,
          height: 10,
          backgroundColor: children.length === toIndexBefore ? 'red' : 'black',
        }}
        onDragEnter={(e) => {
          setToIndexBefore(children.length);
        }}
        onDragLeave={(e) => {
          setToIndexBefore(-1);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
      />
    </div>
  );
}
