import { useState } from 'react';
import InputTextAndAdd from '../components/copyWriting/InputTextAndAdd';
import SentenceSelection from '../components/copyWriting/SentenceSelection';

export default function CopyWriting({
  mode,
}: {
  mode: 'add' | 'selection' | null;
}) {
  const [lines, setLines] = useState<{ text: string; selected: boolean }[]>([]);
  return (
    <>
      {' '}
      <SentenceSelection
        lines={lines}
        buttons={
          mode === 'add'
            ? [
                {
                  name: 'X',
                  handler: (line) => {
                    setLines((prev) => prev.filter((e) => e.text !== line));
                  },
                },
              ]
            : [
                {
                  name: '선택',
                  handler: (line) => {
                    setLines((lines) => {
                      for (const li of lines) {
                        if (li.text === line) li.selected = !li.selected;
                      }
                      return [...lines];
                    });
                  },
                },
              ]
        }
      />
      {mode === 'add' && (
        <InputTextAndAdd
          onAdd={(input) => {
            if (!input) return;
            setLines((prev) => [...prev, { text: input, selected: false }]);
          }}
        />
      )}
    </>
  );
}
