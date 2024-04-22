const highlightedText = (text, tokens) => {
  const parts = text.split(new RegExp(`(${tokens.join('|')})`, 'gi'));
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, index) =>
        tokens.includes(part) ? <mark key={index}>{part}</mark> : part,
      )}
    </>
  );
};

const Sentence = ({ sentence, semester, title, author, link, tokens }) => {
  return (
    <div className="d-block border-start mt-2 mb-2 p-2">
      <div className="fs-5 fw-light fst-italic">
        {highlightedText(sentence, tokens)}
      </div>
      <a
        href={`${process.env.REACT_APP_FILE_URL}/${link}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="text-end fw-lighter" style={{ fontSize: '0.9em' }}>
          {semester}, {title}, {author}
        </div>
      </a>
    </div>
  );
};

export default Sentence;
