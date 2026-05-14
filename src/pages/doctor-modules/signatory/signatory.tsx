import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// helper para sa date formatting
const getCurrentDate = () => {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const toInputDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split('/');
  if (parts.length !== 3) return dateStr; 
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
};

const toDisplayDate = (inputDate: string) => {
  if (!inputDate) return "";
  const parts = inputDate.split('-');
  if (parts.length !== 3) return inputDate;
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

const FORMS_LIST = [
  "Admitting History",
  "Patient History",
  "Tagubilin",
  "Discharge Summary",
  "Medical Abstract"
];

const PHYSICIANS_LIST = [
  "ALODIE JOY -, ABAGATNAN, M",
  "JOWANNA A. ABITRIA, MD",
  "JOHN PATRICK L. ACOSTA, MD",
  "CHARMANE CLAIRE T. AGCAOILI, MD",
  "JOSE MARI C. AHORRO, MD"
];

const SignatoryModule = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  
  // validation modal states
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // form state for the bulk modal
  const [formData, setFormData] = useState<Record<string, { physician: string; date: string }>>({});

  // dummy profile
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
  });

  const [signatories, setSignatories] = useState<any[]>([
    { id: 1, form: "Admitting History", physician: "ALODIE JOY -, ABAGATNAN, M", date: "03/21/2026" },
    { id: 2, form: "Patient History", physician: "JOWANNA A. ABITRIA, MD", date: "03/21/2026" },
    { id: 3, form: "Tagubilin", physician: "JOHN PATRICK L. ACOSTA, MD", date: "03/21/2026" },
    { id: 4, form: "Discharge Summary", physician: "CHARMANE CLAIRE T. AGCAOILI, MD", date: "03/21/2026" },
    { id: 5, form: "Medical Abstract", physician: "JOSE MARI C. AHORRO, MD", date: "03/21/2026" }
  ]);

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

  const initFormData = (recordToEdit: any = null) => {
    const initialData: Record<string, { physician: string; date: string }> = {};
    const currentDate = getCurrentDate();
    
    FORMS_LIST.forEach(form => {
      initialData[form] = {
        physician: "", // empty muna by deflt
        date: currentDate
      };
    });

    if (recordToEdit) {
      if (initialData[recordToEdit.form]) {
        initialData[recordToEdit.form] = {
          physician: recordToEdit.physician,
          date: recordToEdit.date
        };
      }
    }

    setFormData(initialData);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    initFormData();
    setShowAddModal(true);
  };

  const openEditModalForRecord = (record: any) => {
    setIsEditing(true);
    initFormData(record);
    setShowAddModal(true);
  };

  const handleOpenEdit = () => {
    if (!selectedRecordId) return;
    const recordToEdit = signatories.find(r => r.id === selectedRecordId);
    if (recordToEdit) {
      openEditModalForRecord(recordToEdit);
    }
  };

  const handleDeleteClick = () => {
    if (!selectedRecordId) return;
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (!selectedRecordId) return;
    setSignatories(prev => prev.filter(r => r.id !== selectedRecordId));
    setSelectedRecordId(null);
    setShowDeleteConfirmModal(false);
  };

  const handleFormChange = (formName: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    let duplicateForms: string[] = [];

    //validation checker
    FORMS_LIST.forEach(formName => {
      const data = formData[formName];
      if (data && data.physician !== "") {
        const existingRecord = signatories.find(s => s.form === formName);
        
        if (existingRecord) {
          // if adding tapos exssiting na
          if (!isEditing) {
            duplicateForms.push(formName);
          } 
          // validation pag exsisting na tapos itatry iedt
          else if (isEditing && existingRecord.id !== selectedRecordId) {
            duplicateForms.push(formName);
          }
        }
      }
    });

    //kapag nag fail valdiation, trigger the modal
    if (duplicateForms.length > 0) {
      setValidationMessage(`The following form(s) are already added: ${duplicateForms.join(', ')}. Please select the record from the table and click 'Edit' to modify them.`);
      setShowValidationModal(true);
      return; 
    }

    // save if valid 
    let updatedSignatories = [...signatories];

    FORMS_LIST.forEach(formName => {
      const data = formData[formName];
      if (data && data.physician !== "") {
        const existingIndex = updatedSignatories.findIndex(s => s.form === formName);
        
        if (existingIndex >= 0 && isEditing && updatedSignatories[existingIndex].id === selectedRecordId) {
          // udpate exsisting record
          updatedSignatories[existingIndex] = {
            ...updatedSignatories[existingIndex],
            physician: data.physician,
            date: data.date
          };
        } else if (!isEditing || (isEditing && existingIndex === -1)) {
          //add new record
          updatedSignatories.push({
            id: Date.now() + Math.random(),
            form: formName,
            physician: data.physician,
            date: data.date
          });
        }
      }
    });

    setSignatories(updatedSignatories);
    setShowAddModal(false);
  };

  //disable save kapag walang physician selected sa dropdown
  const isSaveDisabled = !Object.values(formData).some(data => data.physician !== "");

  return (
    <>
      <style>{`
        .selected-row td {
          background-color: rgba(15, 118, 63, 0.15) !important;
        }
        .form-row-hover:hover {
          background-color: #f8f9fa;
        }
        
        /* makes the modal wider on tablet screens */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .custom-responsive-modal {
            max-width: 85% !important;
          }
        }
      `}</style>

   

      <div className="content doctor-content bg-light mt-n4 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="container-fluid px-3 px-lg-5 pt-0 flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            
            <DoctorSidebar />

            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0 d-flex flex-column">
              <div
                className="card border-0 shadow-sm p-3 p-md-4 mb-4 d-flex flex-column h-100"
                style={{ borderRadius: "12px", borderTop: "4px solid var(--primary, #0f763f)" }}
              >
                
                {/* profile header */}
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4 mb-4 pb-4 border-bottom text-center text-md-start position-relative">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm flex-shrink-0"
                    style={{ width: "90px", height: "90px", border: "2px solid var(--primary, #0f763f)" }}
                  >
                    <i className="isax isax-user fs-1 text-primary" style={{ color: "var(--primary, #0f763f)" }} />
                  </div>
                  <div>
                    <div className="badge bg-light text-secondary border mb-2 px-2 py-1">
                      ID: {mockPatientProfile.hospitalNumber}
                    </div>
                    <h3 className="fw-bold mb-1 text-dark fs-3 fs-md-2">
                      {mockPatientProfile.lastName}, {mockPatientProfile.firstName} {mockPatientProfile.middleName}
                    </h3>
                    <div className="text-muted small d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                      <i className="isax isax-location text-danger" />
                      {mockPatientProfile.address}
                    </div>
                  </div>
                </div>

              

                {/* table area */}
                <div className="d-flex flex-column flex-grow-1 mb-4">
                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-lg-start">SIGNATORY</h5>
                    
                    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 gap-md-3">
                    <div className="d-flex align-items-center gap-1 w-100 w-md-auto">
                        <button 
                          onClick={handleOpenAdd}
                          className="btn btn-sm btn-light border border-secondary-subtle rounded-1 d-flex align-items-center justify-content-center gap-1 text-dark text-hover-primary flex-grow-1 flex-md-grow-0"
                        >
                          <i className="isax isax-add-square"></i> <span className="d-none d-md-inline">Add</span>
                        </button>
                        
                        <button 
                          onClick={handleOpenEdit}
                          disabled={!selectedRecordId}
                          className={`btn btn-sm btn-light border border-secondary-subtle rounded-1 d-flex align-items-center justify-content-center gap-1 text-dark flex-grow-1 flex-md-grow-0 ${selectedRecordId ? 'text-hover-primary' : 'opacity-50'}`}
                          style={{ cursor: selectedRecordId ? "pointer" : "not-allowed" }}
                        >
                          <i className="isax isax-edit"></i> <span className="d-none d-md-inline">Edit</span>
                        </button>

                        <button 
                          onClick={handleDeleteClick}
                          disabled={!selectedRecordId}
                          className={`btn btn-sm btn-light border border-secondary-subtle rounded-1 d-flex align-items-center justify-content-center gap-1 flex-grow-1 flex-md-grow-0 ${selectedRecordId ? 'text-danger' : 'text-dark opacity-50'}`}
                          style={{ cursor: selectedRecordId ? "pointer" : "not-allowed" }}
                        >
                          <i className="isax isax-trash"></i> <span className="d-none d-md-inline">Del</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-0 flex-grow-1 bg-white">
                    <table className="table table-hover align-middle mb-0" style={{ tableLayout: "auto" }}>
                      <thead className="table-light" style={{ backgroundColor: "#1e4c4a" }}>
                        <tr>
                          <th className="fw-semibold text-secondary py-3 ps-3 border-bottom text-nowrap">Form</th>
                          <th className="fw-semibold text-secondary py-3 border-bottom d-none d-md-table-cell">Name of Physician</th>
                          <th className="fw-semibold text-secondary py-3 pe-3 border-bottom text-nowrap">Date signed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {signatories.map((record) => (
                          <tr 
                            key={record.id}
                            onClick={() => setSelectedRecordId(record.id)}
                            onDoubleClick={() => {
                              setSelectedRecordId(record.id);
                              openEditModalForRecord(record);
                            }}
                            className={selectedRecordId === record.id ? "selected-row" : ""}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="ps-3 py-3 text-dark border-bottom-0">{record.form}</td>
                            <td className="py-3 text-dark border-bottom-0 d-none d-md-table-cell">{record.physician}</td>
                            <td className="pe-3 py-3 text-dark border-bottom-0">{record.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add/edit signatory modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered px-3 custom-responsive-modal">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className={isEditing ? "isax isax-edit" : "isax isax-add-square"} style={{ fontSize: '1.75rem' }}></i>
                  {isEditing ? "EDIT SIGNATORY" : "ADD SIGNATORY"}
                </h3>
                <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowAddModal(false)}></button>
              </div>
              
              <div className="modal-body p-4 bg-white">
                <div className="row mb-3 pb-2 border-bottom fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  <div className="col-4">Form</div>
                  <div className="col-5">Signatory</div>
                  <div className="col-3">Date Signed/<br/>Examined/Seen</div>
                </div>

                {FORMS_LIST.map((formName) => (
                  <div className="row mb-2 align-items-center py-1 form-row-hover rounded" key={formName}>
                    <div className="col-4 d-flex align-items-center gap-2">
                      <label 
                        className="mb-0 text-dark fw-medium" 
                        style={{ fontSize: '0.95rem' }}
                      >
                        {formName}
                      </label>
                    </div>
                    <div className="col-5">
                      <select 
                        className="form-select rounded-1 shadow-none text-dark py-1"
                        style={{ border: '1px solid #ced4da', backgroundColor: '#fff' }}
                        value={formData[formName]?.physician || ""}
                        onChange={(e) => handleFormChange(formName, 'physician', e.target.value)}
                      >
                        <option value="">--, -- MD</option>
                        {PHYSICIANS_LIST.map(physician => (
                          <option key={physician} value={physician}>{physician}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-3">
                      <input 
                        type="date" 
                        className="form-control rounded-1 shadow-none text-dark py-1"
                        style={{ border: '1px solid #ced4da', backgroundColor: '#fff' }}
                        value={toInputDate(formData[formName]?.date)}
                        onChange={(e) => handleFormChange(formName, 'date', toDisplayDate(e.target.value))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-end p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button 
                  type="button" 
                  className={`btn text-white rounded-1 px-4 py-2 fw-medium ${isSaveDisabled ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: 'var(--primary, #0f763f)', cursor: isSaveDisabled ? 'not-allowed' : 'pointer' }} 
                  onClick={handleSave}
                  disabled={isSaveDisabled} 
                >
                  Save and Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* validation warning modal */}
      {showValidationModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-info-circle" style={{ fontSize: '1.5rem' }}></i>
                  Notice
                </h3>
              </div>
              <div className="modal-body p-4 bg-white text-center">
                <i className="isax isax-warning-2 text-warning mb-3 d-block" style={{ fontSize: '3rem' }}></i>
                <p className="mb-0 text-dark fw-medium" style={{ fontSize: '0.95rem' }}>
                  {validationMessage}
                </p>
              </div>
              <div className="modal-footer border-0 p-3 justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                <button 
                  type="button" 
                  className="btn px-4 fw-bold text-white shadow-sm w-100" 
                  style={{ backgroundColor: 'var(--primary, #0f763f)', borderRadius: '4px' }} 
                  onClick={() => setShowValidationModal(false)}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* confirm delete modal */}
      {showDeleteConfirmModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <div className="modal-header border-0 py-2 d-flex align-items-center" style={{ backgroundColor: '#dc3545' }}>
                <h6 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '0.95rem' }}>
                  <i className="isax isax-trash"></i> Confirm Delete
                </h6>
              </div>
              <div className="modal-body p-4 text-center bg-white">
                <i className="isax isax-warning-2 text-danger mb-3 d-block" style={{ fontSize: '2.5rem' }}></i>
                <p className="mb-0 text-dark fw-medium" style={{ fontSize: '0.95rem' }}>Are you sure you want to delete this record?</p>
              </div>
              <div className="modal-footer border-0 p-2 justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
                <button 
                  type="button" 
                  className="btn btn-sm btn-light border border-secondary-subtle fw-bold text-dark shadow-sm px-4" 
                  style={{ borderRadius: '4px' }} 
                  onClick={() => setShowDeleteConfirmModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-sm px-4 fw-bold text-white shadow-sm" 
                  style={{ backgroundColor: '#dc3545', borderRadius: '4px' }} 
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

export default SignatoryModule;