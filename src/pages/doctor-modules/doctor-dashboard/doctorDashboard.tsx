import ImageWithBasePath from "@/components/image-with-base-path"


const DoctorDashboard = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">
                Doctors Module
              </h2>
              <p className="breadcrumb-subtitle">
                Integrated Hospital Operations & Management System
              </p>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-bg-01.png"
            alt="img"
            className="breadcrumb-bg-01"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-bg-02.png"
            alt="img"
            className="breadcrumb-bg-02"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-03"
          />
          <ImageWithBasePath
            src="assets/img/bg/breadcrumb-icon.png"
            alt="img"
            className="breadcrumb-bg-04"
          />
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5 className="mb-4 fw-bold text-uppercase border-bottom pb-2">Module Utilities</h5>
            </div>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Patient Log",
                desc: "List of patients under this ward",
                icon: "isax isax-document-text-15",
                color: "text-primary"
              },
              {
                title: "Archive Viewer",
                desc: "Access archive file online",
                icon: "isax isax-calendar-tick-15",
                color: "text-info"
              },
              {
                title: "Report",
                desc: "System report generation",
                icon: "isax isax-chart-215",
                color: "text-secondary"
              }
            ].map((item, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="card shadow-sm border-0 h-100 p-3">
                  <div className="d-flex align-items-center">
                    {/* Icon Container */}
                    <div className={`bg-light rounded p-3 me-3 ${item.color}`}>
                      <i className={`${item.icon} fs-2`} />
                    </div>
                    {/* Text Content */}
                    <div>
                      <h6 className="mb-1 fw-bold">{item.title}</h6>
                      <p className="small text-muted mb-0">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>

  )
}

export default DoctorDashboard