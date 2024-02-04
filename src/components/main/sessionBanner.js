export default function SessionBanner({ recentSession = {}, children }) {
  if (recentSession.week) {
    return (
      <div className="text-center p-5">
        <h3 className="display-5 fw-normal">{recentSession.week} 주차</h3>
        <h1 className="display-5 fw-bold">{recentSession.title}</h1>
        <div className="col-lg-6 mx-auto">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return '';
  }
}
