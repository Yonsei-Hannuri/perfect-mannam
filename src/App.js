import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage';
import Mypage from './pages/mypage';
import Session from './pages/session';
import LoginPage from './pages/loginPage';
import Archive from './pages/archive';
import HeaderNav from './components/highorder/headerNav';
import Footer from './components/footer';
import getCookieValue from './modules/getCookieValue';

class App extends Component {
  render() {
    const isLogined = getCookieValue(document.cookie, 'isLogin');
    if (isLogined === null || isLogined === 'false') {
      return (
        <div id="fadein" className="h-100">
          <LoginPage />
        </div>
      );
    }
    return (
      <div className="container min-vh-100 d-flex flex-column justify-content-between bg-white">
        <Router>
          <Switch>
            <Route path="/session" component={Session} />
            <Route>
              <HeaderNav
                defaultLinkState={'/' + window.location.pathname.split('/')[1]}
                links={(link, onNavClick) => {
                  return (
                    <>
                      <li className="nav-item">
                        <span
                          name="main"
                          className={
                            'cursor2Pointer nav-link text-end px-3 ' +
                            (link === '/' ? 'active' : '')
                          }
                          onClick={() => onNavClick('/')}
                        >
                          이번학기
                        </span>
                      </li>
                      <li className="nav-item">
                        <span
                          name="main"
                          className={
                            'cursor2Pointer nav-link text-end px-3 ' +
                            (link === '/archive' ? 'active' : '')
                          }
                          onClick={() => onNavClick('/archive')}
                        >
                          아카이브
                        </span>
                      </li>
                      <li className="nav-item">
                        <span
                          name="mypage"
                          className={
                            'cursor2Pointer nav-link text-end px-3 ' +
                            (link === '/mypage' ? 'active' : '')
                          }
                          onClick={() => onNavClick('/mypage')}
                        >
                          마이페이지
                        </span>
                      </li>
                      <li className="nav-item">
                        <a
                          href={process.env.REACT_APP_API_URL + '/logout'}
                          className="nav-link text-end px-3"
                        >
                          로그아웃
                        </a>
                      </li>
                    </>
                  );
                }}
              />
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exect path="/archive" component={Archive} />
                <Route exact path="/mypage" component={Mypage} />
              </Switch>
              <Footer />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
