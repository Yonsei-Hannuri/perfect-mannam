import SessionReadfile from '../containers/sessionReadfile';
import PDFViewer from '../components/session/PDFViewer';
import WordCloud from '../components/wordCloud/WordCloud';
import useSession from '../hooks/session/useSession';
import useOnMount from '../hooks/common/useOnMount';
import useSessionWords from '../hooks/session/useSessionWords';
import DurationLogger from '../modules/DurationLogger';
import { POST_DETGORI_READ_LOG } from '../api/log';
import ShowSelection from '../components/highorder/ShowSelection';
import ColorButton from '../components/design/ColorButton';
import getQueryParams from '../modules/getQueryParams';
import LocalstorageObject from '../modules/LocalstorageObject';

const durationThreshold = 0;
const durationLogger = new DurationLogger((id, duration) => {
  POST_DETGORI_READ_LOG(id, duration);
}, durationThreshold);

function Session() {
  const sessionId = getQueryParams().sessionID;
  const [session, detgoris] = useSession(sessionId);
  const { sessionWordList } = useSessionWords(sessionId);
  const readRecord = new LocalstorageObject(`session-${sessionId}-read-record`);
  useOnMount(() => {
    const unloadhandler = () => durationLogger.close();
    window.addEventListener('beforeunload', unloadhandler);
    return () => {
      unloadhandler();
      window.removeEventListener('beforeunload', unloadhandler);
    };
  });

  if (session === null) return '';
  return (
    <div className="container pt-3 flex-fill d-flex flex-column justify-content-start">
      <div>
        <h2>{session.title}</h2>
        <SessionReadfile
          urls={session.readfile}
          googleFolderId={session.googleFolderId}
        />
        <hr />
      </div>
      {detgoris && (
        <ShowSelection
          title={'댓거리'}
          panel={(detgoriId) => (
            <PDFViewer
              key={detgoriId}
              src={`${process.env.REACT_APP_FILE_URL}/${detgoriId}`}
            />
          )}
          options={(setDetgori) =>
            detgoris.map((detgori) => (
              <ColorButton
                key={detgori.id}
                color={detgori.authorColor}
                text={detgori.authorName}
                onClick={() => {
                  setDetgori(detgori.googleId);
                  durationLogger.changeTarget(detgori.id);
                  readRecord.setValue(detgori.id, true);
                }}
                clicked={readRecord.getValue(detgori.id)}
              />
            ))
          }
        />
      )}
      <div className="flex-fill d-flex flex-column justify-content-center">
        <div>
          <WordCloud wordList={sessionWordList} />
        </div>
      </div>
    </div>
  );
}

export default Session;
