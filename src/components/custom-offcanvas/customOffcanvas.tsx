import { Link, useNavigate } from "react-router";
import ImageWithBasePath from "../image-with-base-path";
import { Offcanvas } from "bootstrap";
import { useState, useEffect } from "react";
import { all_routes } from "@/routes/all_routes";
import SearchPatientModal from "./SearchPatientModal";

const CustomOffcanvas = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handle backdrop click to close offcanvas
  useEffect(() => {
    const element = document.getElementById("support_item");
    if (!element) return;

    const handleHidden = () => {
      // Clean up backdrop after offcanvas is hidden
      setTimeout(() => {
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('offcanvas-active');
      }, 300);
    };

    // Use Bootstrap's hidden event to clean up backdrop (fires AFTER hide completes)
    element.addEventListener('hidden.bs.offcanvas', handleHidden);

    return () => {
      element.removeEventListener('hidden.bs.offcanvas', handleHidden);
    };
  }, []);

  const handleSelectPatient = (patientId: string) => {
    navigate(all_routes.doctorMypatients, {
      state: {selectedPatientId: patientId}
    });
    setShowModal(false);
  };

  const closeOffcanvas = () => {
    const element = document.getElementById("support_item");
    if (!element) return;

    const instance = Offcanvas.getInstance(element) ?? Offcanvas.getOrCreateInstance(element);
    instance.hide();
  };

  const handleSearchClick = () => {
    closeOffcanvas();
    setShowModal(true);
  };

  //mock data for results table
  const mockPatients = [
  { id: "000000000777288", lastName: "BALUTE", firstName: "REA", middleName: "MON", suffix: "" },
  { id: "000000000777289", lastName: "DELA CRUZ", firstName: "JUAN", middleName: "PROFILO", suffix: "JR" },
  { id: "000000000777290", lastName: "SANTOS", firstName: "MARIA", middleName: "CLARA", suffix: "" }
];


  
  return (
    <>
      {/* start offcanvas */}
      <div
        className="offcanvas offcanvas-offset offcanvas-end support_popup"
        tabIndex={-1}
        id="support_item"
        data-bs-backdrop="true"
        data-bs-scroll="true"
      >
        <div className="offcanvas-header">
          <Link to={all_routes.doctorDashboard}>
                <h2 className="logo-name">
                  BRHMC
                </h2>
            {/* <ImageWithBasePath
              src="assets/img/logo.svg"
              alt="logo"
              className="img-fluid logo"
            /> */}
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="isax isax-close-circle" />
          </button>
        </div>
        <div className="offcanvas-body">
          {/* Search Patient */}
          <div className="about-popup-item align-items-center">
            <div className="d-flex justify-content-center mb-4">
              <i className="isax isax-user-search" style={{ fontSize: "4rem", color: "#0d6efd" }} />
            </div>
            <div className="search-patient-container mt-3">
              <button
                type="button"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleSearchClick}
              >
                <i className="isax isax-search-normal-1" />
                <span>Search Patient</span>
              </button>
            </div>
          </div>
        </div>
        <ImageWithBasePath
          src="assets/img/bg/offcanvas-bg.png"
          alt="element"
          className="element-01"
        />
      </div>
      {/* end offcanvas */}

      {showModal && <SearchPatientModal 
      onClose={() => setShowModal(false)} 
      mockPatients={mockPatients} 
      onSelectPatient={handleSelectPatient}
      />}
    </>
  );
};

export default CustomOffcanvas;


