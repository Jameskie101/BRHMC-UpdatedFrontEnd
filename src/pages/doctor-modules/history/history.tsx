import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";



// helper function para s date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hh = String(hours).padStart(2, '0');

    return `${mm}/${dd}/${yyyy} ${hh}:${minutes} ${ampm}`;
  };


//lista kang mga history
const ALL_HISTORY_TYPES = [
  "Present History",
  "Growth and Dev",
  "Past History",
  "Family History",
  "Personal/Social History"
];

const PatientHistory = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  //su sa informant modal state
  const [showInformantModal, setShowInformantModal] = useState(false);
  const [informantInput, setInformantInput] = useState("Family Member");
  const [otherInformantInput, setOtherInformantInput] = useState(""); 
  const [reliabilityInput, setReliabilityInput] = useState("100");
  const [savedInformant, setSavedInformant] = useState<{ type: string; reliability: string } | null>(null);

  //pag add History Modal State
  const [showAddHistoryModal, setShowAddHistoryModal] = useState(false);
  // 2. Update your state initialization
  const [newHistoryDate, setNewHistoryDate] = useState(getCurrentDateTime());
  const [newHistoryType, setNewHistoryType] = useState("");
  const [newHistoryDetails, setNewHistoryDetails] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  
  //pag Warning Modal State 
  const [showWarningModal, setShowWarningModal] = useState(false);

  //pag Mobile View Record Modal State 
  const [viewingRecord, setViewingRecord] = useState<any | null>(null);
  
  //dummy data profle
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

  const [historyRecords, setHistoryRecords] = useState<any[]>([
    {
      id: 1,
      history: "Chief Complaint",
      details: "Please ignore this record. Phhilhealth oecb live test in progress.",
      parsedDetails: null, 
      dateEntered: "03/21/2026 02:45 PM",
      entryBy: "LIQUE, ROWAN M",
    }
  ]);

  const [activeTab, setActiveTab] = useState("PhilHealth");

  const availableHistoryTypes = ALL_HISTORY_TYPES.filter(
    (type) => !historyRecords.some((record) => record.history === type)
  );

  useEffect(() => {
    setSelectedCheckboxes([]);
    setNewHistoryDetails("");
  }, [newHistoryType]);

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

  const handleSaveInformant = () => {
    const finalInformantType = informantInput === "Other" && otherInformantInput.trim() !== "" 
      ? otherInformantInput 
      : informantInput;

    setSavedInformant({
      type: finalInformantType,
      reliability: reliabilityInput,
    });
    setShowInformantModal(false);
  };

  const handleCheckboxToggle = (option: string) => {
    setSelectedCheckboxes((prev) => {
      if (prev.includes(option)) {
        if (option === "Other") setNewHistoryDetails("");
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const getCheckboxOptions = (type: string) => {
    if (type === "Family History" || type === "Past History") {
      return ["Hypertension", "Diabetes Mellitus", "Asthma", "Allergy to food/drug", "Tuberculosis", "Goiter", "Cancer", "Other"];
    }
    if (type === "Personal/Social History") {
      return ["Smoking", "Alcohol", "Illegal Drug", "Diet", "Other"];
    }
    return []; 
  };

  const handleSaveHistory = () => {
    if (!newHistoryType) return;

    let detailsText = "";
    let structuredParsedDetails = null;
    const options = getCheckboxOptions(newHistoryType);

    if (options.length > 0) {
      const validOptions = options.filter(opt => opt !== "Other");
      const checkedOptions = validOptions.filter(opt => selectedCheckboxes.includes(opt));
      const uncheckedOptions = validOptions.filter(opt => !selectedCheckboxes.includes(opt));

      structuredParsedDetails = {
        checked: checkedOptions,
        unchecked: uncheckedOptions,
        notes: newHistoryDetails.trim()
      };
      
    } else {
      detailsText = newHistoryDetails.trim() || "No details provided";
    }

    const newRecord = {
      id: Date.now(),
      history: newHistoryType,
      details: detailsText, 
      parsedDetails: structuredParsedDetails, 
      dateEntered: newHistoryDate,
      entryBy: "CURRENT_USER",
    };

    setHistoryRecords(prevRecords => [...prevRecords, newRecord]);
    
    setNewHistoryType("");
    setNewHistoryDetails("");
    setSelectedCheckboxes([]);
    setShowAddHistoryModal(false);
  };

  const hasCheckboxes = getCheckboxOptions(newHistoryType).length > 0;
  const isOtherChecked = selectedCheckboxes.includes("Other");
  const isTextareaEnabled = !hasCheckboxes || isOtherChecked;
  const isSaveHistoryDisabled = !newHistoryType || (isOtherChecked && newHistoryDetails.trim() === "");

  // Reusable function para sa pag render details sa the table and the sa mobile modal
  const renderRecordDetails = (record: any) => {
    if (record.parsedDetails) {
      return (
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {record.parsedDetails.checked.map((item: string) => (
            <span key={`checked-${item}`} className="badge rounded-1 px-2 py-1 fw-semibold d-flex align-items-center gap-1" style={{ backgroundColor: 'rgba(15, 118, 63, 0.1)', color: 'var(--primary, #0f763f)', border: '1px solid rgba(15, 118, 63, 0.25)' }}>
              <span style={{ fontSize: '1rem', lineHeight: '1' }}>+</span> {item}
            </span>
          ))}
          {record.parsedDetails.unchecked.map((item: string) => (
            <span key={`unchecked-${item}`} className="badge rounded-1 px-2 py-1 fw-medium text-secondary d-flex align-items-center gap-1" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
              <span style={{ fontSize: '1rem', lineHeight: '1' }}>-</span> {item}
            </span>
          ))}
          {record.parsedDetails.notes && (
            <span className="text-dark ms-1 mt-1 fw-medium" style={{ fontSize: '0.9rem' }}>
              <span className="text-muted fw-bold me-2">Others:</span> 
              {record.parsedDetails.notes}
            </span>
          )}
        </div>
      );
    }
    return record.details;
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Patient Record - History</h2>
              </nav>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg">
          <ImageWithBasePath src="assets/img/bg/breadcrumb-bg-01.png" alt="img" className="breadcrumb-bg-01" />
          <ImageWithBasePath src="assets/img/bg/breadcrumb-bg-02.png" alt="img" className="breadcrumb-bg-02" />
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
                {/* Profile Header */}
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4 mb-4 pb-4 border-bottom text-center text-md-start position-relative">
                  <div className="position-absolute top-0 end-0 d-none d-md-block">
                     <button className="btn btn-sm text-dark px-2 py-1 bg-light border rounded text-hover-danger">
                        <i className="isax isax-close-circle fw-bold fs-5"></i>
                     </button>
                  </div>

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

                {/* Demographics */}
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

                {/* sa patient hist container */}
                <div className="d-flex flex-column flex-grow-1 mb-4">
                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3 gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-lg-start">PATIENT HISTORY</h5>
                    
                    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 gap-md-3">
                      
                      <button 
                        onClick={() => setShowInformantModal(true)}
                        className="btn btn-sm text-white fw-semibold rounded-1 shadow-sm px-4 border-0 w-100 w-md-auto"
                        style={{ backgroundColor: "var(--primary, #0f763f)" }}
                      >
                        Informant
                      </button>
                      
                      <div className="btn-group shadow-sm rounded-0 w-100 w-md-auto" role="group">
                        <button 
                          onClick={() => {
                            if (availableHistoryTypes.length === 0) {
                              setShowWarningModal(true); 
                            } else {
                              setShowAddHistoryModal(true);
                            }
                          }}
                          className={`btn btn-sm btn-light border border-secondary-subtle rounded-0 d-flex align-items-center justify-content-center gap-1 text-dark text-hover-primary ${availableHistoryTypes.length === 0 ? 'opacity-50' : ''}`}
                          style={{ cursor: availableHistoryTypes.length === 0 ? "not-allowed" : "pointer" }}
                        >
                          <i className="isax isax-add-square"></i> <span className="d-none d-md-inline">Add</span>
                        </button>
                        
                        <button className="btn btn-sm btn-light border border-secondary-subtle rounded-0 d-flex align-items-center justify-content-center gap-1 text-dark">
                          <i className="isax isax-edit"></i> <span className="d-none d-md-inline">Edit</span>
                        </button>
                        <button className="btn btn-sm btn-light border border-secondary-subtle rounded-0 d-flex align-items-center justify-content-center gap-1 text-danger">
                          <i className="isax isax-trash"></i> <span className="d-none d-md-inline">Del</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* table area */}
                  <div className="border rounded-0 flex-grow-1 bg-white">
                    <table className="table table-hover align-middle mb-0" style={{ tableLayout: "auto" }}>
                      <thead className="table-light">
                        <tr>
                          <th className="fw-semibold text-secondary py-3 ps-3 border-bottom text-nowrap">History</th>
                          {/* Hidden sa mobile, visible on medium+ na screen */}
                          <th className="fw-semibold text-secondary py-3 border-bottom d-none d-md-table-cell">Details</th>
                          <th className="fw-semibold text-secondary py-3 border-bottom text-nowrap d-none d-md-table-cell">Date Entered</th>
                          <th className="fw-semibold text-secondary py-3 pe-3 border-bottom text-nowrap d-none d-lg-table-cell">Entry By</th>
                          {/* Visible ONLY on mobile */}
                          <th className="fw-semibold text-secondary py-3 pe-3 border-bottom text-center d-md-none">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyRecords.map((record) => (
                          <tr key={record.id}>
                            <td className="ps-3 py-3 text-dark border-bottom-0 fw-bold">{record.history}</td>
                            
                            {/* hideen sa mobile view*/}
                            <td className="py-3 text-dark border-bottom-0 d-none d-md-table-cell">
                              {renderRecordDetails(record)}
                            </td>

                            <td className="py-3 text-secondary small border-bottom-0 d-none d-md-table-cell">{record.dateEntered}</td>
                            <td className="pe-3 py-3 text-secondary small border-bottom-0 d-none d-lg-table-cell">{record.entryBy}</td>
                            
                            {/* visible lang sa mobile */}
                            <td className="pe-3 py-3 text-center border-bottom-0 d-md-none">
                              <button 
                                onClick={() => setViewingRecord(record)}
                                className="btn btn-sm btn-light border border-secondary-subtle rounded-1 text-primary shadow-sm"
                              >
                                <i className="isax isax-eye"></i> View
                              </button>
                            </td>
                          </tr>
                        ))}

                        {/* ung saved na informant */}
                        {savedInformant && (
                          <tr style={{ backgroundColor: "#e9ecef" }}>
                            <td colSpan={5} className="p-0 border-0">
                              <div className="px-4 py-3 border-top d-flex flex-column gap-1" style={{ borderLeft: "4px solid var(--primary, #0f763f)" }}>
                                <span className="fw-bold text-dark text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}>Informant and Reliability</span>
                                <div className="d-flex flex-wrap gap-4 mt-1 text-dark" style={{ fontSize: "0.95rem" }}>
                                  <div><span className="text-secondary me-2">Informant:</span><span className="fw-bold">{savedInformant.type}</span></div>
                                  <div><span className="text-secondary me-2">Reliability:</span><span className="fw-bold">{savedInformant.reliability} %</span></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* tabs sa baba */}
                <div 
                  className="d-flex flex-column flex-md-row align-items-center justify-content-start rounded-0 px-2 py-2 gap-2 mt-auto shadow-sm"
                  style={{ backgroundColor: "#2b323c" }}
                >
                  <button 
                    onClick={() => setActiveTab("PhilHealth")}
                    className={`btn btn-sm fw-medium border-0 rounded-0 px-4 text-start w-100 w-md-auto ${activeTab === "PhilHealth" ? "text-white" : "text-white-50 text-hover-white"}`} 
                    style={{ backgroundColor: activeTab === "PhilHealth" ? "rgba(255,255,255,0.15)" : "transparent", transition: "0.2s" }}
                  >
                    PhilHealth Claim
                  </button>
                  <button 
                    onClick={() => setActiveTab("Present")}
                    className={`btn btn-sm fw-medium border-0 rounded-0 px-4 text-start w-100 w-md-auto ${activeTab === "Present" ? "text-white" : "text-white-50 text-hover-white"}`}
                    style={{ backgroundColor: activeTab === "Present" ? "rgba(255,255,255,0.15)" : "transparent", transition: "0.2s" }}
                  >
                    Present History
                  </button>
                  <button 
                    onClick={() => setActiveTab("Past")}
                    className={`btn btn-sm fw-medium border-0 rounded-0 px-4 text-start w-100 w-md-auto ${activeTab === "Past" ? "text-white" : "text-white-50 text-hover-white"}`}
                    style={{ backgroundColor: activeTab === "Past" ? "rgba(255,255,255,0.15)" : "transparent", transition: "0.2s" }}
                  >
                    Past History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- para sa mobile view record modal --- */}
      {viewingRecord && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-document-text" style={{ fontSize: '1.5rem' }}></i>
                  {viewingRecord.history}
                </h3>
                <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setViewingRecord(null)}></button>
              </div>
              
              <div className="modal-body p-4 bg-white">
                <div className="mb-4">
                  <label className="text-secondary small fw-bold text-uppercase mb-2">History Details</label>
                  <div className="p-3 bg-light rounded-2 border">
                    {renderRecordDetails(viewingRecord)}
                  </div>
                </div>

                <div className="row g-3">
                   <div className="col-6">
                      <label className="text-secondary small fw-bold text-uppercase mb-1">Date Entered</label>
                      <p className="mb-0 text-dark fw-medium">{viewingRecord.dateEntered}</p>
                   </div>
                   <div className="col-6">
                      <label className="text-secondary small fw-bold text-uppercase mb-1">Entry By</label>
                      <p className="mb-0 text-dark fw-medium">{viewingRecord.entryBy}</p>
                   </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-end p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary rounded-1 px-4 py-2 fw-medium" 
                  onClick={() => setViewingRecord(null)}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- sa pag add infoirmant modal --- */}
      {showInformantModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-add-square" style={{ fontSize: '1.75rem' }}></i>
                  ADD INFORMANT AND RELIABILITY
                </h3>
                <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowInformantModal(false)}></button>
              </div>
              
              <div className="modal-body p-4 bg-white">
                <div className="mb-4">
                  <label className="form-label text-dark fw-medium mb-1" style={{ fontSize: '0.95rem' }}>Informant</label>
                  <select 
                    value={informantInput}
                    onChange={(e) => setInformantInput(e.target.value)}
                    className="form-select rounded-1 shadow-none text-dark py-2" 
                    style={{ border: '1px solid var(--primary, #0f763f)' }}
                  >
                    <option value="Family Member">Family Member</option>
                    <option value="Friend">Friend</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Relative">Relative</option>
                    <option value="Self">Self</option>
                    <option value="Other">Other</option>
                  </select>

                  {informantInput === "Other" && (
                    <div className="mt-2">
                      <input 
                        type="text" 
                        placeholder="Please specify..."
                        value={otherInformantInput}
                        onChange={(e) => setOtherInformantInput(e.target.value)}
                        className="form-control rounded-1 shadow-none text-dark py-2" 
                        style={{ border: '1px solid var(--primary, #0f763f)' }}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <label className="form-label text-dark fw-medium mb-1" style={{ fontSize: '0.95rem' }}>Reliability %</label>
                  <div style={{ maxWidth: '120px' }}>
                    <input 
                      type="number" 
                      value={reliabilityInput}
                      onChange={(e) => setReliabilityInput(e.target.value)}
                      className="form-control rounded-1 shadow-none text-dark py-2" 
                      style={{ border: '1px solid var(--primary, #0f763f)' }}
                      min="0" max="100" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-end p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button type="button" className="btn text-white rounded-1 px-4 py-2 fw-medium" style={{ backgroundColor: 'var(--primary, #0f763f)' }} onClick={handleSaveInformant}>
                  Save and Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- sa pagg add patient history modal --- */}
      {showAddHistoryModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-add-square" style={{ fontSize: '1.75rem' }}></i>
                  ADD PATIENT HISTORY
                </h3>
                <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowAddHistoryModal(false)}></button>
              </div>
              
              <div className="modal-body p-4 bg-white">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-5 col-lg-4">
                    <label className="form-label text-dark fw-medium mb-1" style={{ fontSize: '0.95rem' }}>Date/Time</label>
                    <input 
                      type="text" 
                      value={newHistoryDate}
                      onChange={(e) => setNewHistoryDate(e.target.value)}
                      className="form-control rounded-1 shadow-none text-dark py-2 bg-light" 
                      style={{ border: '1px solid var(--primary, #0f763f)' }}
                      disabled
                    />
                  </div>
                  
                  <div className="col-12 col-md-7 col-lg-8">
                    <label className="form-label text-dark fw-medium mb-1" style={{ fontSize: '0.95rem' }}>Type of History</label>
                    <select 
                      value={newHistoryType}
                      onChange={(e) => setNewHistoryType(e.target.value)}
                      className="form-select rounded-1 shadow-none text-dark py-2" 
                      style={{ border: '1px solid var(--primary, #0f763f)' }}
                    >
                      <option value="" disabled>Select...</option>
                      {availableHistoryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {newHistoryType && (
                  <div className="mt-2 fade-in">
                    <label className="form-label text-dark fw-medium mb-3" style={{ fontSize: '0.95rem' }}>History Details</label>
                    
                    {hasCheckboxes && (
                      <div className="row g-3 mb-4 px-1">
                        {getCheckboxOptions(newHistoryType).map(option => (
                          <div className="col-6 col-md-3" key={option}>
                            <div className="form-check d-flex align-items-center gap-1">
                              <input 
                                className="form-check-input shadow-none mt-0" 
                                type="checkbox" 
                                id={`check-${option}`} 
                                checked={selectedCheckboxes.includes(option)}
                                onChange={() => handleCheckboxToggle(option)}
                                style={{ border: '1px solid var(--primary, #0f763f)', cursor: 'pointer', width: '18px', height: '18px' }}
                              />
                              <label className="form-check-label text-dark pt-1" htmlFor={`check-${option}`} style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                                {option}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <textarea 
                      value={newHistoryDetails}
                      onChange={(e) => setNewHistoryDetails(e.target.value)}
                      className="form-control rounded-1 shadow-none text-dark p-3" 
                      style={{ 
                        border: '1px solid var(--primary, #0f763f)', 
                        resize: 'none',
                        backgroundColor: isTextareaEnabled ? '#ffffff' : '#f8f9fa',
                        cursor: isTextareaEnabled ? 'text' : 'not-allowed'
                      }}
                      rows={5}
                      placeholder={
                        !hasCheckboxes ? "Enter history details..." : 
                        isOtherChecked ? "Please specify other details..." : 
                        "Check 'Other' above to enable typing..."
                      }
                      disabled={!isTextareaEnabled} 
                    ></textarea>
                  </div>
                )}
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <div className="text-danger small fw-bold">
                  {isOtherChecked && newHistoryDetails.trim() === "" ? "Please specify details for 'Other'." : ""}
                </div>
                
                <button 
                  type="button" 
                  className={`btn text-white rounded-1 px-4 py-2 fw-medium ${isSaveHistoryDisabled ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: 'var(--primary, #0f763f)', cursor: isSaveHistoryDisabled ? 'not-allowed' : 'pointer' }} 
                  onClick={handleSaveHistory}
                  disabled={isSaveHistoryDisabled} 
                >
                  Save and Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- warning modal para sa gamit na ung lahat na history type --- */}
      {showWarningModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered px-3">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              
              <div className="modal-header border-0 py-3 d-flex align-items-center" style={{ backgroundColor: '#333b45' }}>
                <h3 className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  <i className="isax isax-info-circle" style={{ fontSize: '1.5rem' }}></i>
                  Notice
                </h3>
              </div>
              
              <div className="modal-body p-4 bg-white text-center">
                <i className="isax isax-warning-2 text-warning mb-3 d-block" style={{ fontSize: '2rem' }}></i>
                <p className="mb-0 text-dark fw-medium" style={{ fontSize: '1.05rem' }}>
                  All types of history already exist.
                </p>
              </div>
              
              <div className="modal-footer border-0 d-flex justify-content-center p-3" style={{ backgroundColor: '#e2e5e9' }}>
                <button 
                  type="button" 
                  className="btn text-white rounded-1 px-4 py-2 fw-medium w-100" 
                  style={{ backgroundColor: 'var(--primary, #0f763f)' }} 
                  onClick={() => setShowWarningModal(false)}
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientHistory;