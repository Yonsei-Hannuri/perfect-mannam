import { useState } from 'react';
import PhaseChatBox from '../components/phaseGeneration/PhaseChatBox';
import DraggableOrdering from '../components/phaseGeneration/DraggableOrdering';

const reviseContentByCommand = (
  phase: { title: string; content: string },
  command: any,
) => 'revised';

export default function () {
  const [phases, setPhases] = useState<{ title: string; content: string }[]>([
    { content: 'content', title: 'title' },
    { content: 'content2', title: 'title2' },
    { content: 'content3', title: 'title3' },
  ]);

  return (
    <>
      <DraggableOrdering
        onDragEnd={(fromIndex, toIndexBefore) => {
          if (toIndexBefore === -1 || fromIndex === -1) return;
          setPhases((phases) => {
            if (fromIndex < toIndexBefore) {
              phases.splice(toIndexBefore, 0, phases[fromIndex]);
              phases.splice(fromIndex, 1);
            } else if (fromIndex > toIndexBefore) {
              phases.splice(toIndexBefore, 0, phases[fromIndex]);
              phases.splice(fromIndex + 1, 1);
            }
            return [...phases];
          });
        }}
      >
        {phases.map((p, idx) => (
          <PhaseChatBox
            key={idx}
            phase={p}
            onChat={(chat) => {
              setPhases((phases) => {
                const phase = phases.find((e) => e.title == p.title)!;
                phase.content = reviseContentByCommand(phase!, chat);
                return [...phases];
              });
            }}
          />
        ))}
      </DraggableOrdering>
    </>
  );
}
