import InputTextAndAdd from '../components/copyWriting/InputTextAndAdd';
import SentenceSelection from '../components/copyWriting/SentenceSelection';
import { usePhase } from './store/phases';

export default function CopyWriting({
  mode,
}: {
  mode: 'add' | 'selection' | null;
}) {
  const phases = usePhase((state) => state.phases);
  const addCopy = usePhase((state) => state.addCopy);
  const removeCopy = usePhase((state) => state.removeCopy);
  const toggleSelect = usePhase((state) => state.togglSelect);

  return (
    <>
      {' '}
      <SentenceSelection
        lines={phases.map((p) => {
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
