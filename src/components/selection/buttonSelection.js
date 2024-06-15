export default function ButtonSelection({ options, onClickOption, selected }) {
  return (
    <>
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onClickOption(option)}
          className={selected.includes(option) ? 'selected' : ''}
          style={{ color: selected.includes(option) ? 'red' : 'black' }}
        >
          {option}
        </div>
      ))}
    </>
  );
}
