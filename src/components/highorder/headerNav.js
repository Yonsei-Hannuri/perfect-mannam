import { useHistory } from 'react-router';
import { useState } from 'react';
function Header({ links, defaultLinkState }) {
  const [link, setLink] = useState(defaultLinkState);
  const history = useHistory();
  const onNavClick = (link) => {
    history.push({
      pathname: link,
    });
    setLink(link);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <span className="fs-4">
          <img width="30px" src="/blue.ico" alt="icon" />
          한누리
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {links(link, onNavClick)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
