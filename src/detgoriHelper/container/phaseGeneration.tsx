import PhaseChatBox from '../components/phaseGeneration/PhaseChatBox';
import DraggableOrdering from '../components/phaseGeneration/DraggableOrdering';
import { usePhase } from './store/phases';

const reviseContentByCommand = (
  phase: { title: string; content: string },
  command: any,
) => 'revised';

export default function () {
  const phases = usePhase((state) => state.phases.filter((p) => p.selected));
  const changeIndex = usePhase((state) => state.changeOrder);
  const setPhase = usePhase((state) => state.setPhase);

  return (
    <>
      <DraggableOrdering
        onDragEnd={(fromIndex, toIndexBefore) => {
          if (toIndexBefore === -1 || fromIndex === -1) return;
          changeIndex(fromIndex, toIndexBefore);
        }}
      >
        {phases.map((p, idx) => (
          <PhaseChatBox
            key={idx}
            phase={{
              title: p.copy,
              content: p.content === null ? '' : p.content,
            }}
            onChat={(chat) => {
              setPhase(
                p.copy,
                reviseContentByCommand(
                  {
                    title: p.copy,
                    content: p.content === null ? '' : p.content,
                  },
                  chat,
                ),
              );
            }}
          />
        ))}
      </DraggableOrdering>
    </>
  );
}
