import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const PhysicianModule = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  // form states
  const [physicianType, setPhysicianType] = useState("");
  const [physicianName, setPhysicianName] = useState("LIQUE R, MD");
  const [accessStatus, setAccessStatus] = useState("Active");

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

  const [physicians, setPhysicians] = useState<any[]>([
    {
      id: 1,
      type: "Resident",
      name: "ROWAN M. LIQUE, CCTT, WSP",
      accessStatus: "Active",
    }
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

  const openEditModalForRecord = (record: any) => {
    setIsEditing(true);
    setPhysicianType(record.type);
    setPhysicianName(record.name);
    setAccessStatus(record.accessStatus);
    setShowAddModal(true);
  };

  const handleOpenEdit = () => {
    if (!selectedRecordId) return;
    const recordToEdit = physicians.find(r => r.id === selectedRecordId);
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
    setPhysicians(prev => prev.filter(r => r.id !== selectedRecordId));
    setSelectedRecordId(null);
    setShowDeleteConfirmModal(false);
  };

  const handleSave = () => {
    if (!physicianType || !physicianName) return;

    const newRecord = {
      id: isEditing && selectedRecordId ? selectedRecordId : Date.now(),
      type: physicianType,
      name: physicianName,
      accessStatus: accessStatus,
    };

    if (isEditing && selectedRecordId) {
      setPhysicians(prevRecords => prevRecords.map(r => r.id === selectedRecordId ? newRecord : r));
    } else {
      setPhysicians(prevRecords => [...prevRecords, newRecord]);
    }

    setPhysicianType("");
    setPhysicianName("LIQUE R, MD");
    setAccessStatus("Active");
    setIsEditing(false);
    setShowAddModal(false);
  };

  const isSaveDisabled = !physicianType || !physicianName;

  return (
    <>
      <style>{`
        .selected-row td {
          background-color: rgba(15, 118, 63, 0.15) !important;
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

            
                {/* physician table area */}
                <div className="d-flex flex-column flex-grow-1 mb-4">
                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-lg-start">PHYSICIAN</h5>
                    
                    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 gap-md-3">
                      <div className="d-flex align-items-center gap-1 w-100 w-md-auto">
                        <button 
                          onClick={() => {
                            setIsEditing(false);
                            setPhysicianType("");
                            setPhysicianName("LIQUE R, MD");
                            setAccessStatus("Active");
                            setShowAddModal(true);
                          }}
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
                          <th className="fw-semibold text-secondary py-3 ps-3 border-bottom text-nowrap">Type of Physician</th>
                          <th className="fw-semibold text-secondary py-3 border-bottom d-none d-md-table-cell">Name of Physician</th>
                          <th className="fw-semibold text-secondary py-3 pe-3 border-bottom text-nowrap">Access Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {physicians.map((record) => (
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
                            <td className="ps-3 py-3 text-dark border-bottom-0">{record.type}</td>
                            <td className="py-3 text-dark border-bottom-0 d-none d-md-table-cell">{record.name}</td>
                            <td className="pe-3 py-3 text-dark border-bottom-0">{record.accessStatus}</td>
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

      {/* add/edit physician modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className={isEditing ? "isax isax-edit" : "isax isax-add-square"} style={{ fontSize: '1.75rem' }}></i>
                  {isEditing ? "EDIT PHYSICIAN" : "ADD PHYSICIAN"}
                </h3>
                <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowAddModal(false)}></button>
              </div>
              
              <div className="modal-body p-4 bg-white">
                <div className="row mb-3 align-items-center">
                  <div className="col-4">
                    <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Type of Physician</label>
                  </div>
                  <div className="col-8">
                    <select 
                      value={physicianType}
                      onChange={(e) => setPhysicianType(e.target.value)}
                      className="form-select rounded-1 shadow-none text-dark py-1" 
                      style={{ border: '1px solid #ced4da' }}
                    >
                      <option value="" disabled></option>
                      <option value="Admitting">Admitting</option>
                      <option value="Attending">Attending</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Resident">Resident</option>
                      <option value="Surgeon">Surgeon</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3 align-items-center">
                  <div className="col-4">
                    <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Name of Physician</label>
                  </div>
                  <div className="col-8">
                    <select 
                      value={physicianName}
                      onChange={(e) => setPhysicianName(e.target.value)}
                      className="form-select rounded-1 shadow-none text-dark py-1" 
                      style={{ border: '1px solid #ced4da' }}
                    >
                      <option value="LIQUE R, MD">LIQUE R, MD</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3 align-items-center">
                  <div className="col-4">
                    <label className="form-label text-dark fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Access to Record</label>
                  </div>
                  <div className="col-8">
                    <input 
                      type="text" 
                      value={accessStatus}
                      onChange={(e) => setAccessStatus(e.target.value)}
                      className="form-control rounded-1 shadow-none text-dark py-1 w-50" 
                      style={{ border: '1px solid #ced4da' }}
                      readOnly
                    />
                  </div>
                </div>
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
                <p className="mb-0 text-dark fw-medium" style={{ fontSize: '0.95rem' }}>Are you sure you want to delete this physician?</p>
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

export default PhysicianModule;