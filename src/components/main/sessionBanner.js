export default function SessionBanner({
  seasonTitle,
  recentSession = {},
  children,
}) {
  return (
    <div className="flex-fill d-flex flex-column justify-content-center p-5">
      <h3 className="fs-3 text-center fw-light">{seasonTitle}</h3>
      <h1 className="fs-1 fw-bold text-center">{recentSession.title}</h1>
      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {children}
        </div>
      </div>
    </div>
  );
}
