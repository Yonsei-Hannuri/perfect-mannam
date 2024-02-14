function Detgori(props) {
  return (
    <div className="d-flex">
      <li className="list-group-item align-bottom w-90">
        <a
          rel="noreferrer"
          href={`${process.env.REACT_APP_FILE_URL}/${props.detgori.googleId}`}
          target="_blank"
        >
          {props.detgori.sessionTitle}: {props.detgori.detgoriTitle}
        </a>
      </li>
      <li className="list-group-item p-0 pt-2 w-10 border text-center">
        <span
          val={props.detgori.detgoriId}
          onClick={props.deleteRequest}
          className="material-icons-outlined align-middle"
        >
          delete_forever
        </span>
      </li>
    </div>
  );
}

export default Detgori;
