import LoginForm from '../components/login/loginForm';
import getQueryParams from '../modules/getQueryParams';

function Login() {
  const isError = getQueryParams()?.login === 'error';
  return (
    <div className="d-flex h-100 text-center">
      <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column bg-white">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <span className="text-start fs-1 fw-bold">한누리</span>
            <span className="fs-3">생각의 씨앗, 완전한 만남.</span>
          </div>
        </div>
        <div className="flex-fill"></div>
        <div className="d-flex flex-column border-top py-3">
          <LoginForm
            googleUrl={process.env.REACT_APP_GOOGLE_OAUTH_LOGIN_URL}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
