const TokenButton = ({ token, onClick }) => {
  return (
    <span className="p-2 rounded m-2" style={{ backgroundColor: '#cfe0f0' }}>
      {token} &nbsp;&nbsp;
      <button
        onClick={onClick}
        type="button"
        className="btn-close btn-sm p-0"
        aria-label="Close"
      />
    </span>
  );
};

export default TokenButton;
