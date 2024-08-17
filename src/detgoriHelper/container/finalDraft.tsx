import { useParagraph } from './store/paragraph';

export default function () {
  const paragraphs = useParagraph((state) => state.paragraphs);
  return (
    <>
      {paragraphs.map((paragraph) => (
        <div>{paragraph.content}</div>
      ))}
    </>
  );
}
