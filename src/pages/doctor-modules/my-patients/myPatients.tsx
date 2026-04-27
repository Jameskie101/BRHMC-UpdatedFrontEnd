import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const MyPatients = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mockPatientProfile, setMockPatientProfile] = useState ({
      hospitalNumber: "000000000777288",
      lastName: "Namikaze",
      firstName: "Minato",
      middleName: "-",
      address: "Hidden Leaf Village, Land of Fire",
      birthdate: "01/01/2000",
      age: "26 Yrs. Old",
      civilStatus: "Married",
      gender: "Male",
      employmentStatus: "Hokage",
      nationality: "Japanese",
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
    }
  });
  
  useEffect(() => {
    const selectedPatientId = location.state?.selectedPatientId;
    if (selectedPatientId) {
      // Simulate fetching patient profile based on selectedPatientId
      setTimeout(() => {}, 1500);
    }
  }, [location.state]);


  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLAnchorElement | null>(null);

  // Close on outside click
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

  {/* Mock data for patient profile - to be replaced with actual data from backend API */ }


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
          <div className="content doctor-content">
            <div className="container-fluid px-lg-5"> 
              <div className="row">
                <div className="col--4 col-xl-3 theiaStickySidebar mb-4">
                  {/* Profile Sidebar */}
                  <DoctorSidebar />
                </div>
                {/* Specific Patient Record */}
                <div className="col-lg-8 col-xl-9">
                  <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '8px' }}>
                    
                    {/* Patient Profile Header */}
                    <div className="d-flex align-items-start gap-4 mb-4">
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                          style={{ width: '80px', height: '80px', border: '3px solid #1a2b46' }}>
                        <i className="isax isax-user fs-1 text-dark" />
                      </div>
                      <div>
                        <div className="text-secondary small mb-1">{mockPatientProfile.hospitalNumber}</div>
                        <h4 className="fw-bold mb-1">
                          {mockPatientProfile.lastName}, {mockPatientProfile.firstName} {mockPatientProfile.middleName}
                        </h4>
                        <div className="text-muted small">{mockPatientProfile.address}</div>
                      </div>
                    </div>

                    {/* Demographics Row */}
                    <div className="row g-3 border-bottom pb-4 mb-4 text-center">
                      <div className="col-md-2 border-end">
                        <div className="small text-muted">Birthdate: {mockPatientProfile.birthdate}</div>
                        <div className="small fw-bold">Age: {mockPatientProfile.age}</div>
                      </div>
                      <div className="col-md-2 border-end">
                        <div className="small text-muted">Civil Status: {mockPatientProfile.civilStatus}</div>
                        <div className="small fw-bold">Gender: {mockPatientProfile.gender}</div>
                      </div>
                      <div className="col-md-3 border-end">
                        <div className="small text-muted">Employment Status: {mockPatientProfile.employmentStatus}</div>
                        <div className="small fw-bold">Nationality: {mockPatientProfile.nationality}</div>
                      </div>
                      <div className="col-md-2 border-end">
                        <div className="small text-muted">Religion: {mockPatientProfile.religion}</div>
                        <div className="small fw-bold">Senior Citizen No: {mockPatientProfile.seniorCitizenNo}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="small text-muted">MSS No: {mockPatientProfile.mssNo}</div>
                        <div className="small fw-bold">Hospital/DOH personnel: {mockPatientProfile.isPersonnel}</div>
                      </div>
                    </div>

                    {/* Tab Navigation */}
                    <ul className="nav nav-tabs border-0 bg-light rounded-top">
                      <li className="nav-item">
                        <button className="nav-link active fw-bold small py-3">
                          ADMISSION DETAILS
                        </button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link text-dark small py-3 px-4">
                          ACCOUNT INFORMATION
                        </button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link text-dark small py-3 px-4">
                          WARD ASSIGNMENT
                        </button>
                      </li>
                    </ul>

                    {/* Details Body */}
                    <div className="border border-top-0 p-5 rounded-bottom" style={{ borderColor: '#26a69a' }}>
                      {[
                        { label: "Date of Admission:", value: mockPatientProfile.admissionDetails.date },
                        { label: "Admitting Physician:", value: mockPatientProfile.admissionDetails.physician },
                        { label: "Admitting Clerk:", value: mockPatientProfile.admissionDetails.clerk },
                        { label: "Date of Discharge:", value: mockPatientProfile.admissionDetails.dischargeDate },
                        { label: "Disposition:", value: mockPatientProfile.admissionDetails.disposition },
                        { label: "Admitting Diagnosis:", value: mockPatientProfile.admissionDetails.diagnosis }
                      ].map((item, idx) => (
                        <div className="row mb-3" key={idx}>
                          <div className="col-md-4 text-end fw-bold small">{item.label}</div>
                          <div className="col-md-8 small text-uppercase">{item.value}</div>
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
