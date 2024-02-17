/**
 *
 * @param {{ googleUrl, isError }} props
 * @returns
 */
function LoginForm(props) {
  return (
    <main>
      <div className="my-3">
        <div className="d-flex justify-content-center">
          <div>
            <div className="lead text-start px-1">
              {props.isError ? '로그인에 실패했습니다.' : '학회원 로그인'}
            </div>
            <a className="text-start" href={props.googleUrl}>
              <img width="250px" src="/google.png" alt="google login" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
