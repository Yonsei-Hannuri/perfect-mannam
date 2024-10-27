import SessionBanner from '../components/main/sessionBanner';
import FolderUI from '../components/main/folderUI/folderUI';
import { useHistory } from 'react-router';
import useCurrentSeason from '../hooks/season/useCurrentSeason';

function MainPage() {
  const { seasonTitle, seasonSessions: sessions } = useCurrentSeason();
  const history = useHistory();
  return (
    <div className="flex-fill d-flex justify-content-between flex-column">
      <div className="d-flex justify-content-end flex-row fs-6 fw-bold p-2 cursor-pointer text-secondary">
        <div
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${
              process.env.REACT_APP_COWRITER_URL
            }?type=create&subjectId=hannuri-session-${
              sessions[sessions.length - 1].id
            }&subjectInfoUrl=${
              process.env.REACT_APP_API_URL
            }%2Fcowriter-subject%2F%3FsessionId%3D${
              sessions[sessions.length - 1].id
            }&origin=${window.location.href}`;
          }}
        >
          {' 👉 댓거리가 안 써질 땐? '}
        </div>
      </div>
      <SessionBanner
        seasonTitle={seasonTitle}
        recentSession={sessions[sessions.length - 1]}
      >
        {sessions.length !== 0 && (
          <button
            type="button"
            className="btn btn-light border btn-lg px-4 gap-3"
            onClick={() => {
              history.push({
                pathname:
                  '/session/?sessionID=' + sessions[sessions.length - 1].id,
              });
            }}
          >
            세션 입장하기
          </button>
        )}
      </SessionBanner>
      <FolderUI seasonSessionInfos={sessions} />
    </div>
  );
}

export default MainPage;
