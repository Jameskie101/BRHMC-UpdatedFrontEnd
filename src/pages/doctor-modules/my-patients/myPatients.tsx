import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const MyPatients = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mockPatientProfile, setMockPatientProfile] = useState({
    hospitalNumber: "000000000777288",
    lastName: "DO",
    firstName: "REA",
    middleName: "MON",
    address: "111 Estanza, Legazpi City, Albay",
    birthdate: "01/01/2000",
    age: "26 Yrs. Old",
    civilStatus: "Married",
    gender: "Male",
    employmentStatus: "Employed",
    nationality: "Filipino",
    religion: "Catholic",
    seniorCitizenNo: "",
    mssNo: "",
    isPersonnel: "No",

    admissionDetails: {
      date: "03/21/2026 02:45 PM",
      physician: "Ippo Makunochi, MD",
      clerk: "Joseph Joestar",
      dischargeDate: "---",
      disposition: "---",
      diagnosis: "For Confinement",
    },
  });

  useEffect(() => {
    const selectedPatientId = location.state?.selectedPatientId;
    if (selectedPatientId) {
      setTimeout(() => {}, 1500);
    }
  }, [location.state]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Patient Record</h2>
              </nav>
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
      <div
        className="content doctor-content bg-light mt-n4"
        style={{ minHeight: "100vh" }}
      >
        {/*=nag ad ako px3 sa mobile padding tapos tig keep ko pxlg5 sa large screens*/}
        <div className="container-fluid px-3 px-lg-5 pt-0">
          <div className="row">
            {/* Profile Sidebar */}
            <DoctorSidebar />

            {/* Specific Patient Record */}
            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0">
              <div
                className="card border-0 shadow-sm p-3 p-md-4 mb-4"
                style={{
                  borderRadius: "12px",
                  borderTop: "4px solid var(--primary, #0f763f)",
                }}
              >
                {/* Patient Profile Header - Made responsive with flex-column on mobile */}
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4 mb-4 pb-4 border-bottom text-center text-md-start">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm flex-shrink-0"
                    style={{
                      width: "90px",
                      height: "90px",
                      border: "2px solid var(--primary, #0f763f)",
                    }}
                  >
                    <i
                      className="isax isax-user fs-1 text-primary"
                      style={{ color: "var(--primary, #0f763f)" }}
                    />
                  </div>
                  <div>
                    <div className="badge bg-light text-secondary border mb-2 px-2 py-1">
                      ID: {mockPatientProfile.hospitalNumber}
                    </div>
                    <h3 className="fw-bold mb-1 text-dark fs-3 fs-md-2">
                      {mockPatientProfile.lastName},{" "}
                      {mockPatientProfile.firstName}{" "}
                      {mockPatientProfile.middleName}
                    </h3>
                    <div className="text-muted small d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                      <i className="isax isax-location text-danger" />
                      {mockPatientProfile.address}
                    </div>
                  </div>
                </div>

                {/* Demographics Grid */}
                <h6
                  className="fw-bold mb-3 text-secondary text-uppercase"
                  style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}
                >
                  Demographic Details
                </h6>

                <div className="row g-2 mb-4">
                  {[
                    { label: "Birthdate", value: mockPatientProfile.birthdate },
                    { label: "Age", value: mockPatientProfile.age },
                    { label: "Gender", value: mockPatientProfile.gender },
                    {
                      label: "Civil Status",
                      value: mockPatientProfile.civilStatus,
                    },
                    {
                      label: "Nationality",
                      value: mockPatientProfile.nationality,
                    },
                    { label: "Religion", value: mockPatientProfile.religion },
                    {
                      label: "Employment",
                      value: mockPatientProfile.employmentStatus,
                    },
                    {
                      label: "Hospital Personnel",
                      value: mockPatientProfile.isPersonnel,
                    },
                    {
                      label: "Senior Citizen No.",
                      value: mockPatientProfile.seniorCitizenNo,
                    },
                    { label: "MSS No.", value: mockPatientProfile.mssNo },
                  ].map((item, idx) => (
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={idx}>
                      <div className="px-3 py-2 bg-light rounded-2 h-100 border border-light-subtle text-center text-sm-start">
                        <span
                          className="text-muted d-block text-truncate mb-0"
                          style={{
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                          }}
                          title={item.label}
                        >
                          {item.label}
                        </span>
                        <span
                          className="fw-bold text-dark d-block text-truncate"
                          style={{ fontSize: "0.85rem" }}
                          title={item.value || "—"}
                        >
                          {item.value || "—"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tab-navigation-wrapper mb-4">
                  <style>
                    {`
      /* pag tago sa scrollbar for WebKit browsers (Chrome, Safari, Edge) */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
                  </style>

                  <div
                    className="d-flex border-bottom overflow-x-auto text-nowrap pb-1 hide-scrollbar"
                    style={{
                      scrollbarWidth:
                        "none" /* tiga tago  scrollbar in Firefox */,
                      msOverflowStyle:
                        "none" /* tiga tago scrollbar in IE/Edge */,
                      WebkitOverflowScrolling:
                        "touch" /* pampa smooth momentum scrolling sa iOS */,
                    }}
                  >
                    <button
                      className="btn btn-link text-decoration-none fw-bold pb-2 px-3 px-md-4 rounded-0"
                      style={{
                        color: "var(--primary, #0f763f)",
                        borderBottom: "3px solid var(--primary, #0f763f)",
                        whiteSpace: "nowrap", // Guarantees text won't stack on tiny screens
                      }}
                    >
                      ADMISSION DETAILS
                    </button>
                    <button
                      className="btn btn-link text-decoration-none text-muted fw-semibold pb-2 px-3 px-md-4"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      ACCOUNT INFORMATION
                    </button>
                    <button
                      className="btn btn-link text-decoration-none text-muted fw-semibold pb-2 px-3 px-md-4"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      WARD ASSIGNMENT
                    </button>
                  </div>
                </div>

                {/* details body-fixed mobile label, su alisngment */}
                <div className="px-2 px-md-3">
                  {[
                    {
                      label: "Date of Admission",
                      value: mockPatientProfile.admissionDetails.date,
                    },
                    {
                      label: "Admitting Physician",
                      value: mockPatientProfile.admissionDetails.physician,
                    },
                    {
                      label: "Admitting Clerk",
                      value: mockPatientProfile.admissionDetails.clerk,
                    },
                    {
                      label: "Date of Discharge",
                      value: mockPatientProfile.admissionDetails.dischargeDate,
                    },
                    {
                      label: "Disposition",
                      value: mockPatientProfile.admissionDetails.disposition,
                    },
                    {
                      label: "Admitting Diagnosis",
                      value: mockPatientProfile.admissionDetails.diagnosis,
                    },
                  ].map((item, idx) => (
                    <div className="row mb-3 align-items-center" key={idx}>
                      {/* Added text-start for mobile, text-md-end for desktop. Added mb-1 for mobile spacing */}
                      <div className="col-12 col-md-4 text-muted small fw-semibold text-start text-md-end pr-md-4 mb-1 mb-md-0">
                        {item.label}:
                      </div>
                      <div className="col-12 col-md-8 fw-bold text-dark text-uppercase bg-light rounded px-3 py-2 border border-light-subtle text-break">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default MyPatients;
