import React, { useEffect, useState } from "react";
import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useLocation } from "react-router";

// --- Types ---
interface DiagnosisRecord {
  id: string;
  dateTime: string;
  typeOfDiag: string;
  physician: string;
  typeOfPhysician: string;
  diagnosisText: string;
  icdCode: string;
  isPrimary: string;
}

// --- mck data temporary options value based sa vid ---
const MOCK_PHYSICIANS = [
  "-- --. -",
  "Abagatnan Alodie Joy. -",
  "Abitria Jowanna. A",
  "Aboga Louise.",
  "Acosta John Patrick. L",
  "Ador Michelle. M",
  "Adviento Jerelyn. B",
  "Agcaoili Charmane Claire. T",
  "Agripa Virgie Nonette. S",
  "Aguila Edsel. B",
];

const DIAGNOSIS_TYPES = ["","Final"];
const PHYSICIAN_TYPES = ["", "Attending Physician"];
const YES_NO = ["Yes", "No"];

// get currentdate and tirme
const getCurrentDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const DiagnosisModule = () => {
  const location = useLocation();

  const [mockPatientProfile] = useState({
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
  });

  // --- State Management ---
  const [records, setRecords] = useState<DiagnosisRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    dateTime: getCurrentDateTimeLocal(),
    typeOfDiag: "Admitting",
    physician: MOCK_PHYSICIANS[0],
    typeOfPhysician: "",
    diagnosisText: "",
    icdCode: "",
    isPrimary: "No",
  });

  // sa pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (location.state?.selectedPatientId) {
      setTimeout(() => {}, 1500);
    }
  }, [location.state]);

  const isRowSelected = selectedRecordId !== null;
  const isFormValid = formData.diagnosisText.trim().length > 0;

  const totalPages = Math.max(1, Math.ceil(records.length / pageSize));
  const paginatedRecords = records.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); 
  };

  // --- Handlers ---
  const handleAdd = () => {
    setFormData({
      dateTime: getCurrentDateTimeLocal(),
      typeOfDiag: "Admitting",
      physician: MOCK_PHYSICIANS[0],
      typeOfPhysician: "",
      diagnosisText: "",
      icdCode: "",
      isPrimary: "No",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = () => {
    if (!selectedRecordId) return;
    const recordToEdit = records.find((r) => r.id === selectedRecordId);
    if (recordToEdit) {
      setFormData({
        dateTime: recordToEdit.dateTime,
        typeOfDiag: recordToEdit.typeOfDiag,
        physician: recordToEdit.physician,
        typeOfPhysician: recordToEdit.typeOfPhysician,
        diagnosisText: recordToEdit.diagnosisText,
        icdCode: recordToEdit.icdCode,
        isPrimary: recordToEdit.isPrimary,
      });
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDeleteClick = () => {
    if (!selectedRecordId) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRecordId) {
      setRecords((prev) => {
        const updated = prev.filter((r) => r.id !== selectedRecordId);
        const newTotalPages = Math.max(1, Math.ceil(updated.length / pageSize));
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
        return updated;
      });
      setSelectedRecordId(null);
    }
    setShowDeleteModal(false);
  };

  const saveRecord = () => {
    if (!isFormValid) return;

    if (isEditing && selectedRecordId) {
      setRecords((prev) =>
        prev.map((r) => (r.id === selectedRecordId ? { ...r, ...formData } : r))
      );
    } else {
      const newRecord: DiagnosisRecord = {
        id: Date.now().toString(),
        ...formData,
      };
      setRecords((prev) => [...prev, newRecord]);
      setCurrentPage(1); 
    }
  };

  const handleSaveAndClose = () => {
    if (!isFormValid) return;
    saveRecord();
    setShowModal(false);
  };

  const toggleRowExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevents clicking the button from selecting the row
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // sa automatic dropdown value kapag final
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData((prev) => {
      const updates = { ...prev, typeOfDiag: val };
      if (val === "Final") {
        updates.typeOfPhysician = "Attending Physician";
        updates.physician = "-- --. -";
      }
      return updates;
    });
  };

  // pag determine dropdown options based sa Type of Diagnosis
  const currentPhysicianTypes = formData.typeOfDiag === "Final" ? ["Attending Physician"] : PHYSICIAN_TYPES;

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
          .hide-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .hide-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
          .text-hover-primary:hover { color: var(--primary, #0f763f) !important; }
          
          /* Updated Row Highlight Design */
          .table-hover tbody tr { cursor: pointer; transition: all 0.2s ease-in-out; }
          .selected-row > td { 
            background-color: #e6f4ea !important; 
            color: #0b592f !important; 
          }
          .selected-row > td:first-child { 
            border-left: 4px solid var(--primary, #0f763f) !important; 
          }
          .selected-row .text-muted {
            color: #0f763f !important; 
          }

          /* Modal Inline Forms */
          .form-control-compact { padding: 4px 8px; font-size: 0.85rem; height: 32px; border: 1px solid #ced4da; border-radius: 2px; }
          .form-select-compact { padding: 4px 24px 4px 8px; font-size: 0.85rem; height: 32px; border: 1px solid #ced4da; border-radius: 2px; }

          /* Wider modal for Tablets */
          @media (min-width: 768px) and (max-width: 1199px) {
            .tablet-wide-modal { max-width: 95% !important; width: 95% !important; }
          }

          /* Responsive Breakpoints */
          @media (max-width: 575.98px) {
            .modal-footer-actions { flex-direction: column-reverse; width: 100%; }
            .modal-footer-actions button { width: 100%; margin-top: 8px; }
            .pagination-controls { flex-direction: column; gap: 12px; }
          }
        `}
      </style>

      

      <div className="content doctor-content bg-light mt-n4 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="container-fluid px-3 px-lg-5 pt-0 flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            <DoctorSidebar />

            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0 d-flex flex-column">
              <div className="card border-0 shadow-sm p-3 p-md-4 mb-4 d-flex flex-column flex-grow-1" style={{ borderRadius: "12px", borderTop: "4px solid var(--primary, #0f763f)" }}>
                
                {/* Patient Profile Header */}
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4 mb-4 pb-4 border-bottom text-center text-md-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm flex-shrink-0" style={{ width: "90px", height: "90px", border: "2px solid var(--primary, #0f763f)" }}>
                    <i className="isax isax-user fs-1 text-primary" style={{ color: "var(--primary, #0f763f)" }} />
                  </div>
                  <div>
                    <div className="badge bg-light text-secondary border mb-2 px-2 py-1">ID: {mockPatientProfile.hospitalNumber}</div>
                    <h3 className="fw-bold mb-1 text-dark fs-3 fs-md-2">
                      {mockPatientProfile.lastName}, {mockPatientProfile.firstName} {mockPatientProfile.middleName}
                    </h3>
                    <div className="text-muted small d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                      <i className="isax isax-location text-danger" />
                      {mockPatientProfile.address}
                    </div>
                  </div>
                </div>

            
                <div className="d-flex flex-column flex-grow-1 mb-4">
                  
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-md-start text-uppercase">Diagnosis</h5>
            
                    <div className="d-flex flex-wrap justify-content-center justify-content-md-end pb-1 pb-lg-0 ms-md-auto" style={{ gap: "6px" }}>
                      <button 
                        onClick={handleAdd} 
                        className="btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap bg-white text-dark fw-bold text-hover-primary flex-grow-1 flex-md-grow-0"
                        style={{ borderRadius: "4px", cursor: "pointer" }}
                      >
                        <i className="isax isax-add-square"></i> <span>Add</span>
                      </button>
                      
                      <button 
                        onClick={handleEdit} 
                        disabled={!isRowSelected}
                        className={`btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap flex-grow-1 flex-md-grow-0 ${
                          !isRowSelected ? 'bg-light text-muted opacity-50' : 'bg-white text-dark fw-bold'
                        }`}
                        style={{ borderRadius: "4px", cursor: !isRowSelected ? "not-allowed" : "pointer" }}
                      >
                        <i className="isax isax-edit"></i> <span>Edit</span>
                      </button>

                      <button 
                        onClick={handleDeleteClick} 
                        disabled={!isRowSelected}
                        className={`btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap flex-grow-1 flex-md-grow-0 ${
                          !isRowSelected ? 'bg-light text-muted opacity-50' : 'bg-white text-danger fw-bold'
                        }`}
                        style={{ borderRadius: "4px", cursor: !isRowSelected ? "not-allowed" : "pointer" }}
                      >
                        <i className="isax isax-trash"></i> <span>Del</span>
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-0 flex-grow-1 bg-white shadow-sm d-flex flex-column overflow-hidden" style={{ minHeight: "450px" }}>
                    <div className="table-responsive flex-grow-1 bg-white p-0">
                      <table className="table table-hover align-middle mb-0 w-100" style={{ fontSize: "0.85rem" }}>
                        <thead style={{ backgroundColor: "#f8f9fa" }}>
                          <tr>
                            <th className="border-bottom py-3 px-4 text-dark fw-bold" style={{ width: "20%" }}>Type of Diag</th>
                            <th className="border-bottom py-3 px-4 text-dark fw-bold d-none d-lg-table-cell" style={{ width: "10%" }}>Primary</th>
                            <th className="border-bottom py-3 px-4 text-dark fw-bold" style={{ width: "40%" }}>Diagnosis</th>
                            <th className="border-bottom py-3 px-4 text-dark fw-bold d-none d-lg-table-cell" style={{ width: "15%" }}>ICD Code</th>
                            <th className="border-bottom py-3 px-4 text-dark fw-bold d-none d-lg-table-cell" style={{ width: "15%" }}>Physician</th>
                            {/* action column na visible lang sa smaller screens */}
                            <th className="border-bottom py-3 px-4 text-dark fw-bold text-center d-table-cell d-lg-none" style={{ width: "15%" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedRecords.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center text-muted py-5 border-0">
                                <i className="isax isax-document-text fs-1 mb-3 opacity-50 d-block" style={{ fontSize: '3rem' }}></i>
                                <h6 className="fw-bold mb-1">No diagnosis records found.</h6>
                                <p className="small mb-0">Click <strong className="text-dark">Add</strong> in the toolbar above to begin.</p>
                              </td>
                            </tr>
                          ) : (
                            paginatedRecords.map((record) => (
                              <React.Fragment key={record.id}>
                                <tr 
                                  onClick={() => setSelectedRecordId(record.id)}
                                  className={selectedRecordId === record.id ? "selected-row" : ""}
                                >
                                  <td className="py-3 px-4 fw-medium text-dark border-start-0 align-top">{record.typeOfDiag}</td>
                                  
                                  {/* Hidden sa small screens */}
                                  <td className="py-3 px-4 align-top d-none d-lg-table-cell">{record.isPrimary}</td>
                                  
                                  <td className="py-3 px-4 text-wrap text-break align-top" style={{ maxWidth: "350px" }}>{record.diagnosisText}</td>
                                  
                                  {/* Hidden sa small screens */}
                                  <td className="py-3 px-4 align-top d-none d-lg-table-cell">{record.icdCode}</td>
                                  <td className="py-3 px-4 text-muted align-top d-none d-lg-table-cell">{record.physician !== "-- --. -" ? record.physician : "--, --"}</td>
                                  
                                  {/* Mobile/Tablet seemre btn */}
                                  <td className="text-center align-middle py-3 px-2 d-table-cell d-lg-none">
                                    <button 
                                      className="btn btn-sm btn-outline-secondary px-3 rounded-1 text-nowrap"
                                      onClick={(e) => toggleRowExpand(e, record.id)}
                                    >
                                      {expandedRows[record.id] ? "Hide" : "See More"}
                                    </button>
                                  </td>
                                </tr>

                                {/* Expanded Rows sa Mobile/Tablet */}
                                {expandedRows[record.id] && (
                                  <tr className="d-lg-none bg-light">
                                    <td colSpan={3} className="px-4 py-3 border-bottom">
                                      <div className="d-flex flex-column gap-2 rounded-2 border p-3 bg-white shadow-sm">
                                        <div className="d-flex justify-content-between border-bottom pb-2">
                                          <span className="text-muted small fw-bold text-uppercase">Primary Diagnosis</span>
                                          <span className="fw-medium text-dark">{record.isPrimary}</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-bottom pb-2">
                                          <span className="text-muted small fw-bold text-uppercase">ICD Code</span>
                                          <span className="fw-medium text-dark">{record.icdCode || "—"}</span>
                                        </div>
                                        <div className="d-flex flex-column pt-1">
                                          <span className="text-muted small fw-bold text-uppercase mb-1">Physician / Type</span>
                                          <span className="fw-medium text-dark">{record.physician !== "-- --. -" ? record.physician : "--, --"}</span>
                                          <span className="small text-muted">{record.typeOfPhysician || "—"}</span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {records.length > 0 && (
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 border-top bg-light gap-2 pagination-controls">
                        
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted small fw-medium">Show</span>
                          <select 
                            className="form-select form-select-sm shadow-none" 
                            style={{ width: "75px", borderColor: "#ced4da" }}
                            value={pageSize}
                            onChange={handlePageSizeChange}
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                          <span className="text-muted small fw-medium">entries</span>
                        </div>

                        <span className="text-muted small fw-medium text-center">
                          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, records.length)} of {records.length} entries
                        </span>
                        
                        <div className="d-flex gap-1">
                          <button 
                            className="btn btn-sm btn-outline-secondary px-3" 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                          <span className="btn btn-sm btn-light disabled px-3 text-dark fw-bold border">
                            {currentPage} / {totalPages}
                          </span>
                          <button 
                            className="btn btn-sm btn-outline-secondary px-3" 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-muted fw-bold" style={{ fontSize: "0.85rem" }}>
                  Total Number of Record/s: <span className="text-dark">{records.length}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add .edit form modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
          <div className="modal-dialog modal-xl tablet-wide-modal modal-dialog-centered px-2 px-sm-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "8px", overflow: "hidden" }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: "#333b45" }}>
                <h4 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}>
                  <i className="isax isax-add-square" style={{ fontSize: "1.5rem" }}></i>
                  {isEditing ? "EDIT" : "ADD"} DIAGNOSIS
                </h4>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body p-4 bg-white">
                
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-3">
                    <label className="text-muted small fw-bold mb-1">Date/Time <span className="text-danger">*</span></label>
                    <input 
                      type="datetime-local" 
                      className="form-control form-control-compact shadow-none" 
                      style={{ borderColor: "var(--primary, #0f763f)" }}
                      value={formData.dateTime}
                      onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                    />
                  </div>
                  <div className="col-12 col-md-2">
                    <label className="text-muted small fw-bold mb-1">Type of Diagnosis <span className="text-danger">*</span></label>
                    <select 
                      className="form-select form-select-compact shadow-none"
                      style={{ borderColor: "var(--primary, #0f763f)" }}
                      value={formData.typeOfDiag}
                      onChange={handleTypeChange}
                    >
                      {DIAGNOSIS_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="text-muted small fw-bold mb-1">Physician</label>
                    <select 
                      className="form-select form-select-compact shadow-none"
                      style={{ borderColor: "var(--primary, #0f763f)" }}
                      value={formData.physician}
                      onChange={(e) => setFormData({...formData, physician: e.target.value})}
                    >
                      {MOCK_PHYSICIANS.map(phys => <option key={phys} value={phys}>{phys}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="text-muted small fw-bold mb-1">Type of Physician</label>
                    <select 
                      className="form-select form-select-compact shadow-none"
                      style={{ 
                        borderColor: "var(--primary, #0f763f)", 
                        backgroundColor: formData.typeOfDiag === "Final" ? "#e9ecef" : "#ffffff" 
                      }}
                      value={formData.typeOfPhysician}
                      onChange={(e) => setFormData({...formData, typeOfPhysician: e.target.value})}
                    >
                      {currentPhysicianTypes.map(ptype => <option key={ptype} value={ptype}>{ptype}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-bold mb-1">Diagnosis <span className="text-danger">*</span></label>
                  <textarea 
                    className={`form-control rounded-1 shadow-none ${!isFormValid && formData.diagnosisText.length === 0 ? 'is-invalid' : ''}`} 
                    rows={8}
                    style={{ borderColor: "var(--primary, #0f763f)", resize: "none", fontSize: "0.9rem" }}
                    value={formData.diagnosisText}
                    onChange={(e) => setFormData({...formData, diagnosisText: e.target.value})}
                  ></textarea>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="text-muted small fw-bold mb-1">ICD Code</label>
                    <input 
                      type="text" 
                      className="form-control form-control-compact shadow-none" 
                      style={{ borderColor: "var(--primary, #0f763f)" }}
                      value={formData.icdCode}
                      onChange={(e) => setFormData({...formData, icdCode: e.target.value})}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="text-muted small fw-bold mb-1">Primary Diagnosis</label>
                    <select 
                      className="form-select form-select-compact shadow-none"
                      style={{ borderColor: "var(--primary, #0f763f)", maxWidth: "100px" }}
                      value={formData.isPrimary}
                      onChange={(e) => setFormData({...formData, isPrimary: e.target.value})}
                    >
                      {YES_NO.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

              </div>

              <div className="modal-footer border-0 p-3 justify-content-end" style={{ backgroundColor: "#e2e5e9" }}>
                <div className="d-flex modal-footer-actions gap-2 w-100 justify-content-sm-end">
                  <button 
                    type="button" 
                    className="btn bg-secondary text-white rounded-1 px-5 py-2 fw-medium shadow-sm" 
                    onClick={saveRecord}
                    disabled={!isFormValid}
                    style={{ opacity: !isFormValid ? 0.6 : 1, cursor: !isFormValid ? "not-allowed" : "pointer" }}
                  >
                    Save
                  </button>
                  <button 
                    type="button" 
                    className="btn rounded-1 px-4 py-2 fw-medium shadow-sm text-white" 
                    style={{ 
                      backgroundColor: "var(--primary, #0f763f)",
                      opacity: !isFormValid ? 0.6 : 1,
                      cursor: !isFormValid ? "not-allowed" : "pointer"
                    }} 
                    onClick={handleSaveAndClose}
                    disabled={!isFormValid}
                  >
                    Save and Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* dletre confirmation modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-warning-2" style={{ fontSize: '1.5rem' }}></i>
                  Confirm Delete
                </h3>
              </div>
              
              <div className="modal-body p-4 bg-white text-center">
                <i className="isax isax-trash text-danger mb-3 d-block" style={{ fontSize: '2.5rem' }}></i>
                <p className="mb-0 text-dark fw-medium" style={{ fontSize: '1.05rem' }}>
                  Are you sure you want to delete this <strong className="text-danger">Diagnosis Record</strong>?
                </p>
              </div>
              
              <div className="modal-footer border-0 d-flex flex-column flex-sm-row justify-content-center gap-2 p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button 
                  type="button" 
                  className="btn btn-light rounded-1 px-4 py-2 fw-medium border-secondary-subtle w-100" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger rounded-1 px-4 py-2 fw-medium w-100" 
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiagnosisModule;