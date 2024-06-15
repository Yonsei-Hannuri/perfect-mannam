import { useState } from 'react';
import InputTextAndAdd from '../components/copyWriting/InputTextAndAdd';
import SentenceSelection from '../components/copyWriting/SentenceSelection';

export default function CopyWriting() {
  const [lines, setLines] = useState<{ text: string; selected: boolean }[]>([]);
  return (
    <>
      {' '}
      <SentenceSelection
        lines={lines}
        buttons={[
          {
            name: 'X',
            handler: (line) => {
              setLines((prev) => prev.filter((e) => e.text !== line));
            },
          },
        ]}
      />
      <InputTextAndAdd
        onAdd={(input) => {
          if (!input) return;
          setLines((prev) => [...prev, { text: input, selected: false }]);
        }}
      />
    </>
  );
}
