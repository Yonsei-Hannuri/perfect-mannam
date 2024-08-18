import Paragraph from '../components/paragraph/Paragraph';
import DraggableOrdering from '../components/paragraph/DraggableOrdering';
import { useParagraphByEssay } from './store/paragraph';
import { useEffect } from 'react';

export default function () {
  const {
    paragraphs,
    fetch,
    loading,
    addParagraph,
    removeParagraph,
    changeOrder,
    regenerateParagraph,
    modifyParagraph,
  } = useParagraphByEssay();
  useEffect(() => {
    fetch(1);
  }, []);
  console.log(paragraphs);
  return (
    <>
      <DraggableOrdering
        onDragEnd={(fromIndex, toIndexBefore) => {
          if (toIndexBefore === -1 || fromIndex === -1) return;
          changeOrder(paragraphs[fromIndex].id, toIndexBefore);
        }}
      >
        {paragraphs.map((p, idx) => (
          <Paragraph
            key={idx}
            paragraph={{
              title: '',
              content: p.content,
            }}
            onChat={(chat) => {
              regenerateParagraph(p.id, chat);
            }}
          />
        ))}
      </DraggableOrdering>
    </>
  );
}
