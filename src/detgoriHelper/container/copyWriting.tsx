import InputTextAndAdd from '../components/copyWriting/InputTextAndAdd';
import SentenceSelection from '../components/copyWriting/SentenceSelection';
import { useParagraph } from './store/paragraph';

export default function CopyWriting({
  mode,
}: {
  mode: 'add' | 'selection' | null;
}) {
  const paragraphs = useParagraph((state) => state.paragraphs);
  const addCopy = useParagraph((state) => state.addCopy);
  const removeCopy = useParagraph((state) => state.removeCopy);
  const toggleSelect = useParagraph((state) => state.togglSelect);

  return (
    <>
      {' '}
      <SentenceSelection
        lines={paragraphs.map((p) => {
          return { text: p.copy, selected: p.selected };
        })}
        buttons={
          mode === 'add'
            ? [
                {
                  name: 'X',
                  handler: (line) => {
                    removeCopy(line);
                  },
                },
              ]
            : [
                {
                  name: '선택',
                  handler: (line) => {
                    toggleSelect(line);
                  },
                },
              ]
        }
      />
      {mode === 'add' && (
        <InputTextAndAdd
          onAdd={(input) => {
            if (!input) return;
            addCopy(input);
          }}
        />
      )}
    </>
  );
}
