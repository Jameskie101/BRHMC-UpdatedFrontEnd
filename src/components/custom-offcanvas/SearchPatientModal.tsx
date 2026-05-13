import React, { useState } from 'react';
import ImageWithBasePath from '../image-with-base-path';
import { Link } from 'react-router';
import { all_routes } from '@/routes/all_routes';

interface SearchPatientModalProps {
  onClose: () => void;
  mockPatients: any[];
  onSelectPatient?: (patientId: string) => void;
}

const SearchPatientModal: React.FC<SearchPatientModalProps> = ({ onClose, mockPatients, onSelectPatient }) => {
  const [patientData, setPatientData] = useState({
    patientId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    generalParameter: "",
    suffix: ""
  });

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const [errors, setErrors] = useState({ patientId: false });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [consultationRecords, setConsultationRecords] = useState<any[]>([]);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientData.patientId.trim()) {
      setErrors({ patientId: true });
      return;
    }

    setErrors({ patientId: false });
    setIsLoading(true); // Start loading animation/delay

    console.log("Connecting to API...", patientData);

    // Simulate API Network Delay (1.5 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setIsSearching(true);

      //API logic for fetching data from database

    }, 1500);
  };

  const handlePatientSelect = (patientId: string) => {
    setIsLoading(true);
    setSelectedPatient(patientId);
    console.log("Fetching Consultation Records for:", patientId);

    // Simulate API delay for consultation records
    setTimeout(() => {
      //based on the sample data on figma
      setConsultationRecords([
        { date: "04/15/2026 04:23: PM", type: "OPD Consultation", discharge: "—" },
        { date: "11/18/2025 08:48 AM", type: "ER Department (For Admission)", discharge: "21 Mar 26 02:40 PM" }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleConsultaionRecordClick = (patientId: string) => {
    if (onSelectPatient) {
        onSelectPatient(patientId);
        onClose();
    }
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setConsultationRecords([]);
  };

  const resetForm = () => {
    setPatientData({
      patientId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      generalParameter: "",
      suffix: ""
    });
    setErrors({ patientId: false });
  };

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1060
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0 search-patient-modal">

          {/* Modal Header with Logo - Similar to Common Header */}
          <div className="search-patient-modal-header">
            <Link to={all_routes.doctorDashboard} className="logo">
              <h2 className="logo-name">BRHMC</h2>
              <ImageWithBasePath
                src="assets/img/brhmclogo.png"
                alt="logo"
                className="img-fluid"
              />
            </Link>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            />
          </div>
          {/* Conditional Rendering Logic */}
          {isLoading ? (
            /* Loading View */
            <div className="modal-body text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h6 className="text-muted fw-bold">Querying iHOMIS Database...</h6>
              <p className="small text-secondary">Searching for Patient ID: {patientData.patientId}</p>
            </div>
          ) : !isSearching ? (
            /* Search Form */
            <form onSubmit={handleSubmitSearch}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="patientId" className="form-label small fw-bold">Patient IDz <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className={`input-group-text bg-transparent border-end-0 ${errors.patientId ? 'border-danger' : ''}`}>
                        <i className="isax isax-personalcard" />
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${errors.patientId ? 'is-invalid' : ''}`}
                        id="patientId"
                        placeholder="Enter Hospital Number"
                        value={patientData.patientId}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (errors.patientId) setErrors({ patientId: false });
                        }}
                      />
                      {errors.patientId && <div className="invalid-feedback">A valid Patient ID is required.</div>}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="firstName" className="form-label small fw-bold">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={patientData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="middleName" className="form-label small fw-bold">Middle Name</label>
                    <input type="text" className="form-control" id="middleName" value={patientData.middleName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="lastName" className="form-label small fw-bold">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={patientData.lastName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="generalParameter" className="form-label small fw-bold">General Parameter</label>
                    <input type="text" className="form-control" id="generalParameter" value={patientData.generalParameter} onChange={handleInputChange} />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="suffix" className="form-label small fw-bold">Suffix</label>
                    <select
                      className="form-select"
                      id="suffix"
                      value={patientData.suffix}
                      onChange={(e) => setPatientData(prev => ({ ...prev, suffix: e.target.value }))}
                    >
                      <option value="">None</option>
                      <option value="Jr.">Jr.</option>
                      <option value="Sr.">Sr.</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="submit" className="btn btn-primary px-4">Search Patient</button>
              </div>
            </form>
          ) : selectedPatient ? (
            /* Consultation Record View */
            <>
              <div className="modal-body p-0 bg-white">
                {/* Internal Teal Header for Consultation Record */}
                <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ backgroundColor: '#002b2b', color: 'white' }}>
                  <div className="d-flex align-items-center gap-2">
                    <i className="isax isax-folder-2 fw-bold" />
                    <span className="fw-bold" style={{ fontSize: '0.75rem' }}>CONSULTATION RECORD</span>
                    <span className="ms-1 border-start ps-2" style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                      Patient Consultation And Confinement History
                    </span>
                  </div>
                </div>

                <div className="table-responsive" style={{ minHeight: '300px' }}>
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr style={{ fontSize: '0.75rem' }}>
                        <th className="ps-3 border-0">Date Of Consultation :</th>
                        <th className="border-0">Type Of Consultation :</th>
                        <th className="border-0">Date Of Discharge :</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.85rem' }}>
                      {consultationRecords.map((record, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f1f1f1' }}
                        onClick={() => handleConsultaionRecordClick(selectedPatient!)}>
                          <td className="ps-3 py-3">{record.date}</td>
                          <td className="py-3 fw-bold">{record.type}</td>
                          <td className="py-3 text-secondary">{record.discharge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Black Footer for Consultation View */}
              <div className="modal-footer justify-content-between border-0 p-2" style={{ backgroundColor: 'black', color: 'white' }}>
                <div className="ps-2">
                  <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{consultationRecords.length} Record/s Found</div>
                  <div className="text-info" style={{ fontSize: '0.65rem' }}>Select and double click or hit Enter key to retrieve record.</div>
                </div>
                <button
                  className="btn btn-dark btn-sm d-flex align-items-center gap-2 px-3"
                  style={{ backgroundColor: '#1c2b46', border: '1px solid #333' }}
                  onClick={handleBackToList}
                >
                  <i className="isax isax-arrow-left-2 small" />
                  <span className="small fw-bold">BACK TO PATIENT LIST</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-body p-0 bg-white">
                {/* Table Specific Header Style */}
                <div className="table-responsive" style={{ minHeight: '300px' }}>
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr style={{ fontSize: '0.8rem', borderBottom: '2px solid #dee2e6' }}>
                        <th className="ps-3 border-0 py-3">Hospital Number :</th>
                        <th className="border-0 py-3">Last Name :</th>
                        <th className="border-0 py-3">First Name :</th>
                        <th className="border-0 py-3">Middle Name :</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.85rem' }}>
                      {mockPatients.map((patient, index) => (
                        <tr key={index}
                            style={{ cursor: 'pointer', borderBottom: '1px solid #f1f1f1' }}

                            onClick={() => handlePatientSelect(patient.id)}
                            >
                          <td className="ps-3 py-3 text-secondary">{patient.id}</td>
                          <td className="py-3">{patient.lastName}</td>
                          <td className="py-3">{patient.firstName}</td>
                          <td className="py-3">{patient.middleName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Black Footer - same sa Figma Design */}
              <div className="modal-footer justify-content-between border-0 p-3" style={{ backgroundColor: 'black', color: 'white' }}>
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{mockPatients.length} Record/s Found</div>
                  <div className="fst-italic text-info" style={{ fontSize: '0.7rem' }}>
                    Select a patient to retrieve record.
                  </div>
                </div>
                <button
                  className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2"
                  style={{ backgroundColor: '#1a2234', color: 'white', border: '1px solid #333', borderRadius: '6px' }}
                  onClick={() => setIsSearching(false)}
                >
                  <i className="isax isax-arrow-left-2" />
                  <span className="small fw-bold">BACK TO SEARCH</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPatientModal;