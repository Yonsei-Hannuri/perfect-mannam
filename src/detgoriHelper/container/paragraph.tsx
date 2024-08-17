import Paragraph from '../components/paragraph/Paragraph';
import DraggableOrdering from '../components/paragraph/DraggableOrdering';
import { useParagraph } from './store/paragraph';

const reviseContentByCommand = (
  paragraph: { title: string; content: string },
  command: any,
) => 'revised';

export default function () {
  const paragraphs = useParagraph((state) =>
    state.paragraphs.filter((p) => p.selected),
  );
  const changeIndex = useParagraph((state) => state.changeOrder);
  const setParagraph = useParagraph((state) => state.setParagraph);

  return (
    <>
      <DraggableOrdering
        onDragEnd={(fromIndex, toIndexBefore) => {
          if (toIndexBefore === -1 || fromIndex === -1) return;
          changeIndex(fromIndex, toIndexBefore);
        }}
      >
        {paragraphs.map((p, idx) => (
          <Paragraph
            key={idx}
            paragraph={{
              title: p.copy,
              content: p.content === null ? '' : p.content,
            }}
            onChat={(chat) => {
              setParagraph(
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
