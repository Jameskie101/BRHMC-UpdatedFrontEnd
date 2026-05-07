import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// List of standard symptoms
const SYMPTOMS_LIST = [
  "Altered mental sensorium",
  "Abdominal cramp / pain",
  "Anorexia",
  "Bleeding gums",
  "Body weakness",
  "Blurring of vision",
  "Chest pain/discomfort",
  "Constipation",
  "Cough",
  "Diarrhea",
  "Dizziness",
  "Dysphagia",
  "Dyspnea",
  "Dysuria",
  "Epistaxis",
  "Fever",
  "Frequency of urination",
  "Headache",
  "Hematemesis",
  "Hematuria",
  "Hemoptysis",
  "Irritability",
  "Jaundice",
  "Lower extremity edema",
  "Myalgia",
  "Orthopnea",
  "Stool, bloody/black tarry/mucoid",
  "Palpitation",
  "Seizures",
  "Skin rashes",
  "Sweating",
  "Urgency",
  "Vomiting",
  "Weight loss",
];

const PatientSignsAndSymptoms = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Dummy patient data
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

  //pag manage kang modules
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);
  
  //sa custom modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // sa form state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [painChecked, setPainChecked] = useState(false);
  const [painValue, setPainValue] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  //backupsate para sa cancel na bug or functionality
  const [savedState, setSavedState] = useState<{
    selectedSymptoms: string[];
    painChecked: boolean;
    painValue: string;
    otherChecked: boolean;
    otherValue: string;
  } | null>(null);

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

  //form handlers
  const handleAdd = () => {
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSavedState({
      selectedSymptoms,
      painChecked,
      painValue,
      otherChecked,
      otherValue,
    });
    setHasSavedData(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (savedState) {
      setSelectedSymptoms(savedState.selectedSymptoms);
      setPainChecked(savedState.painChecked);
      setPainValue(savedState.painValue);
      setOtherChecked(savedState.otherChecked);
      setOtherValue(savedState.otherValue);
    } else {
      setSelectedSymptoms([]);
      setPainChecked(false);
      setPainValue("");
      setOtherChecked(false);
      setOtherValue("");
    }
    setIsEditing(false);
  };

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setSelectedSymptoms([]);
    setPainChecked(false);
    setPainValue("");
    setOtherChecked(false);
    setOtherValue("");
    setSavedState(null);
    setHasSavedData(false);
    setIsEditing(false);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Signs | Symptoms</h2>
              </nav>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <ImageWithBasePath src="assets/img/bg/breadcrumb-bg-01.png" alt="img" className="breadcrumb-bg-01" />
          <ImageWithBasePath src="assets/img/bg/breadcrumb-bg-02.png" alt="img" className="breadcrumb-bg-02" />
          <ImageWithBasePath src="assets/img/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-03" />
          <ImageWithBasePath src="assets/img/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-04" />
        </div>
      </div>

      <div className="content doctor-content bg-light mt-n4 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="container-fluid px-3 px-lg-5 pt-0 flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            <DoctorSidebar />

            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0 d-flex flex-column">
              <div
                className="card border-0 shadow-sm p-3 p-md-4 mb-4 d-flex flex-column h-100"
                style={{ borderRadius: "12px", borderTop: "4px solid var(--primary, #0f763f)" }}
              >
                {/* Patient Profile Header */}
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

                <div className="row g-2 mb-4 text-nowrap">
                  {[
                    { label: "Birthdate", value: mockPatientProfile.birthdate },
                    { label: "Age", value: mockPatientProfile.age },
                    { label: "Civil Status", value: mockPatientProfile.civilStatus },
                    { label: "Gender", value: mockPatientProfile.gender },
                    { label: "Employment Status", value: mockPatientProfile.employmentStatus },
                    { label: "Nationality", value: mockPatientProfile.nationality },
                    { label: "Religion", value: mockPatientProfile.religion },
                    { label: "Senior Citizen No.", value: mockPatientProfile.seniorCitizenNo },
                    { label: "MSS No.", value: mockPatientProfile.mssNo },
                    { label: "Hospital/DOH Personnel", value: mockPatientProfile.isPersonnel },
                  ].map((item, idx) => (
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={idx}>
                      <div className="px-3 py-2 bg-light rounded-2 h-100 border border-light-subtle text-center text-sm-start">
                        <span className="text-muted d-block text-truncate mb-0" style={{ fontSize: "0.65rem", textTransform: "uppercase" }}>{item.label}</span>
                        <span className="fw-bold text-dark d-block text-truncate" style={{ fontSize: "0.85rem" }}>{item.value || "—"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex flex-column flex-grow-1 mb-4">

                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-lg-start text-uppercase">Pertinent Sign and Symptoms</h5>
                    
                    <div className="d-flex flex-wrap shadow-sm rounded-1" role="group" style={{ gap: "4px", transition: "all 0.3s ease" }}>
                      
                      <button 
                        onClick={handleAdd} 
                        disabled={isEditing || hasSavedData}
                        className={`btn btn-sm border-secondary-subtle d-flex align-items-center justify-content-center gap-2 px-3 py-2 ${
                          isEditing || hasSavedData ? 'bg-light text-muted opacity-50' : 'bg-white text-dark fw-bold'
                        }`}
                        style={{ 
                          borderRadius: "3px", 
                          cursor: (isEditing || hasSavedData) ? "not-allowed" : "pointer" 
                        }}
                      >
                        <i className="isax isax-add-square"></i> Add
                      </button>
                      
                      <button 
                        onClick={handleEdit} 
                        disabled={!hasSavedData || isEditing}
                        className={`btn btn-sm border-secondary-subtle d-flex align-items-center justify-content-center gap-2 px-3 py-2 ${
                          (!hasSavedData || isEditing) ? 'bg-light text-muted opacity-50' : 'bg-white text-dark fw-bold'
                        }`}
                        style={{ 
                          borderRadius: "3px", 
                          cursor: (!hasSavedData || isEditing) ? "not-allowed" : "pointer" 
                        }}
                      >
                        <i className="isax isax-edit"></i> Edit
                      </button>

                      <button 
                        onClick={handleSave} 
                        disabled={!isEditing}
                        className={`btn btn-sm border-secondary-subtle d-flex align-items-center justify-content-center gap-2 px-3 py-2 ${
                          !isEditing ? 'bg-light text-muted opacity-50' : 'text-white fw-bold shadow-sm'
                        }`}
                        style={{ 
                          borderRadius: "3px", 
                          cursor: !isEditing ? "not-allowed" : "pointer",
                          backgroundColor: isEditing ? "var(--primary, #0f763f)" : undefined,
                          borderColor: isEditing ? "var(--primary, #0f763f)" : undefined
                        }}
                      >
                        <i className="isax isax-save-2"></i> Save
                      </button>
                      
                      <button 
                        onClick={handleCancel} 
                        disabled={!isEditing}
                        className={`btn btn-sm border-secondary-subtle d-flex align-items-center justify-content-center gap-2 px-3 py-2 ${
                          !isEditing ? 'bg-light text-muted opacity-50' : 'bg-white text-dark fw-bold'
                        }`}
                        style={{ 
                          borderRadius: "3px", 
                          cursor: !isEditing ? "not-allowed" : "pointer" 
                        }}
                      >
                        <i className="isax isax-undo"></i> Cancel
                      </button>
                      
                      <button 
                        onClick={handleDeleteClick} 
                        disabled={!hasSavedData || isEditing}
                        className={`btn btn-sm border-secondary-subtle d-flex align-items-center justify-content-center gap-2 px-3 py-2 ${
                          (!hasSavedData || isEditing) ? 'bg-light text-muted opacity-50' : 'bg-white text-danger fw-bold'
                        }`}
                        style={{ 
                          borderRadius: "3px", 
                          cursor: (!hasSavedData || isEditing) ? "not-allowed" : "pointer" 
                        }}
                      >
                        <i className="isax isax-trash"></i> Del
                      </button>

                    </div>
                  </div>

                  <div className="border rounded-0 flex-grow-1 bg-white d-flex flex-column shadow-sm">
                    <table className="table table-hover align-middle mb-0" style={{ tableLayout: "auto" }}>
                      <thead className="table-light">
                        <tr>
                          <th className="fw-semibold text-secondary py-3 ps-3 border-bottom text-nowrap" style={{ color: "var(--primary, #0f763f)" }}>
                            Signs and Symptoms Checklist
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 p-md-4 border-bottom-0">
                            
                            {!isEditing && !hasSavedData ? (
                              <div className="d-flex flex-column align-items-center justify-content-center text-muted py-5">
                                <i className="isax isax-document-text fs-1 mb-2 opacity-50"></i>
                                <p className="mb-0">No pertinent signs and symptoms recorded.</p>
                                <p className="small">Click <strong className="text-dark">Add</strong> in the toolbar to begin.</p>
                              </div>
                            ) : (
                              <div className="row g-2">
                                {SYMPTOMS_LIST.map((symptom, index) => (
                                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                    <div className="form-check d-flex align-items-center gap-1">
                                      <input
                                        className="form-check-input mt-0 shadow-none"
                                        type="checkbox"
                                        id={`symptom-${index}`}
                                        checked={selectedSymptoms.includes(symptom)}
                                        onChange={() => handleSymptomToggle(symptom)}
                                        disabled={!isEditing}
                                        style={{
                                          border: '1px solid var(--primary, #0f763f)',
                                          cursor: isEditing ? 'pointer' : 'not-allowed',
                                          width: '16px', height: '16px'
                                        }}
                                      />
                                      <label
                                        className="form-check-label text-dark pt-1"
                                        htmlFor={`symptom-${index}`}
                                        style={{ fontSize: "0.85rem", cursor: isEditing ? 'pointer' : 'not-allowed' }}
                                      >
                                        {symptom}
                                      </label>
                                    </div>
                                  </div>
                                ))}

                                <div className="col-12 mt-4">
                                  <div className="form-check d-flex align-items-center gap-1 mb-2">
                                    <input
                                      className="form-check-input mt-0 shadow-none"
                                      type="checkbox"
                                      id="check-pain"
                                      checked={painChecked}
                                      onChange={(e) => {
                                        setPainChecked(e.target.checked);
                                        if (!e.target.checked) setPainValue(""); 
                                      }}
                                      disabled={!isEditing}
                                      style={{ border: '1px solid var(--primary, #0f763f)', cursor: isEditing ? 'pointer' : 'not-allowed', width: '16px', height: '16px' }}
                                    />
                                    <label className="form-check-label text-dark pt-1 fw-bold" htmlFor="check-pain" style={{ fontSize: "0.85rem", cursor: isEditing ? 'pointer' : 'not-allowed' }}>
                                      Pain
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control rounded-1 shadow-none"
                                    value={painValue}
                                    onChange={(e) => setPainValue(e.target.value.toUpperCase())}
                                    disabled={!painChecked || !isEditing}
                                    style={{ 
                                      borderColor: "var(--primary, #0f763f)", 
                                      backgroundColor: (!painChecked || !isEditing) ? "#f8f9fa" : "#ffffff",
                                      fontSize: "0.9rem"
                                    }}
                                  />
                                </div>

                                <div className="col-12 mt-3">
                                  <div className="form-check d-flex align-items-center gap-1 mb-2">
                                    <input
                                      className="form-check-input mt-0 shadow-none"
                                      type="checkbox"
                                      id="check-other"
                                      checked={otherChecked}
                                      onChange={(e) => {
                                        setOtherChecked(e.target.checked);
                                        if (!e.target.checked) setOtherValue(""); 
                                      }}
                                      disabled={!isEditing}
                                      style={{ border: '1px solid var(--primary, #0f763f)', cursor: isEditing ? 'pointer' : 'not-allowed', width: '16px', height: '16px' }}
                                    />
                                    <label className="form-check-label text-dark pt-1 fw-bold" htmlFor="check-other" style={{ fontSize: "0.85rem", cursor: isEditing ? 'pointer' : 'not-allowed' }}>
                                      Other
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control rounded-1 shadow-none"
                                    value={otherValue}
                                    onChange={(e) => setOtherValue(e.target.value.toUpperCase())}
                                    disabled={!otherChecked || !isEditing}
                                    style={{ 
                                      borderColor: "var(--primary, #0f763f)", 
                                      backgroundColor: (!otherChecked || !isEditing) ? "#f8f9fa" : "#ffffff",
                                      fontSize: "0.9rem"
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  Are you sure you want to clear the current form?
                </p>
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-center gap-2 p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button 
                  type="button" 
                  className="btn btn-light rounded-1 px-4 py-2 fw-medium border-secondary-subtle" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger rounded-1 px-4 py-2 fw-medium" 
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

export default PatientSignsAndSymptoms;