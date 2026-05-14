import DoctorSidebar from "@/components/custom-sidebar/doctorSidebar";
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
  });

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [painChecked, setPainChecked] = useState(false);
  const [painValue, setPainValue] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  // Backup state
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

  // Handlers
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
      <style>
        {`
          .acc-info-backdrop {
            position: fixed;
            inset: 0;
            z-index: 1080;
            background: rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .acc-info-box {
            width: 360px;
            max-width: 100%;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
          }

          .acc-info-title {
            height: 40px;
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }

          .acc-info-icon {
            width: 42px;
            height: 42px;
            background: #dc3545;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
          }
        `}
      </style>

      <div
        className="content doctor-content bg-light mt-n4 d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <div className="container-fluid px-3 px-lg-5 pt-0 flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            <DoctorSidebar />

            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0 d-flex flex-column">
              <div
                className="card border-0 shadow-sm p-3 p-md-4 mb-4 d-flex flex-column h-100"
                style={{
                  borderRadius: "12px",
                  borderTop: "4px solid var(--primary, #0f763f)",
                }}
              >
                {/* PATIENT PROFILE */}
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
                      className="isax isax-user fs-1"
                      style={{ color: "var(--primary, #0f763f)" }}
                    />
                  </div>

                  <div>
                    <div className="badge bg-light text-secondary border mb-2 px-2 py-1">
                      ID: {mockPatientProfile.hospitalNumber}
                    </div>

                    <h3 className="fw-bold mb-1 text-dark">
                      {mockPatientProfile.lastName},{" "}
                      {mockPatientProfile.firstName}{" "}
                      {mockPatientProfile.middleName}
                    </h3>

                    <div className="text-muted small d-flex align-items-center gap-2">
                      <i className="isax isax-location text-danger" />
                      {mockPatientProfile.address}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="d-flex flex-column flex-grow-1 mb-4">
                  {/* HEADER */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0 text-uppercase">
                      Pertinent Sign and Symptoms
                    </h5>

                    {(hasSavedData || isEditing) && (
                      <div
                        className="d-flex flex-wrap justify-content-end"
                        style={{ gap: "4px" }}
                      >
                        <button
                          onClick={handleEdit}
                          disabled={!hasSavedData || isEditing}
                          className={`btn btn-sm border-secondary-subtle d-flex align-items-center gap-2 px-3 py-2 ${
                            !hasSavedData || isEditing
                              ? "bg-light text-muted opacity-50"
                              : "bg-white text-dark fw-bold"
                          }`}
                          style={{
                            borderRadius: "3px",
                          }}
                        >
                          <i className="isax isax-edit"></i>
                          Edit
                        </button>

                        <button
                          onClick={handleSave}
                          disabled={!isEditing}
                          className={`btn btn-sm d-flex align-items-center gap-2 px-3 py-2 ${
                            !isEditing
                              ? "bg-light text-muted opacity-50"
                              : "text-white fw-bold"
                          }`}
                          style={{
                            borderRadius: "3px",
                            backgroundColor: isEditing
                              ? "var(--primary, #0f763f)"
                              : undefined,
                            border: isEditing
                              ? "1px solid var(--primary, #0f763f)"
                              : undefined,
                          }}
                        >
                          <i className="isax isax-save-2"></i>
                          Save
                        </button>

                        <button
                          onClick={handleCancel}
                          disabled={!isEditing}
                          className={`btn btn-sm border-secondary-subtle d-flex align-items-center gap-2 px-3 py-2 ${
                            !isEditing
                              ? "bg-light text-muted opacity-50"
                              : "bg-white text-dark fw-bold"
                          }`}
                          style={{
                            borderRadius: "3px",
                          }}
                        >
                          <i className="isax isax-undo"></i>
                          Cancel
                        </button>

                        <button
                          onClick={handleDeleteClick}
                          disabled={!hasSavedData || isEditing}
                          className={`btn btn-sm border-secondary-subtle d-flex align-items-center gap-2 px-3 py-2 ${
                            !hasSavedData || isEditing
                              ? "bg-light text-muted opacity-50"
                              : "bg-white text-danger fw-bold"
                          }`}
                          style={{
                            borderRadius: "3px",
                          }}
                        >
                          <i className="isax isax-trash"></i>
                          Del
                        </button>
                      </div>
                    )}
                  </div>

                  {/* TABLE */}
                  <div className="border rounded-0 flex-grow-1 bg-white shadow-sm">
                    <table
                      className="table table-hover align-middle mb-0"
                    >
                      <thead className="table-light">
                        <tr>
                          <th
                            className="fw-semibold py-3 ps-3 border-bottom"
                            style={{ color: "var(--primary, #0f763f)" }}
                          >
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

                                <p className="mb-1">
                                  No pertinent signs and symptoms recorded.
                                </p>

                                <button
                                  onClick={handleAdd}
                                  className="btn btn-sm mt-3 text-white fw-bold d-flex align-items-center gap-2 px-3 py-2"
                                  style={{
                                    borderRadius: "3px",
                                    backgroundColor:
                                      "var(--primary, #0f763f)",
                                    border:
                                      "1px solid var(--primary, #0f763f)",
                                  }}
                                >
                                  <i className="isax isax-add-square"></i>
                                  Add Signs & Symptoms
                                </button>
                              </div>
                            ) : (
                              <div className="row g-2">
                                {SYMPTOMS_LIST.map((symptom, index) => (
                                  <div
                                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                                    key={index}
                                  >
                                    <div className="form-check d-flex align-items-center gap-1">
                                      <input
                                        className="form-check-input mt-0 shadow-none"
                                        type="checkbox"
                                        id={`symptom-${index}`}
                                        checked={selectedSymptoms.includes(
                                          symptom
                                        )}
                                        onChange={() =>
                                          handleSymptomToggle(symptom)
                                        }
                                        disabled={!isEditing}
                                        style={{
                                          border:
                                            "1px solid var(--primary, #0f763f)",
                                        }}
                                      />

                                      <label
                                        className="form-check-label text-dark pt-1"
                                        htmlFor={`symptom-${index}`}
                                        style={{
                                          fontSize: "0.85rem",
                                        }}
                                      >
                                        {symptom}
                                      </label>
                                    </div>
                                  </div>
                                ))}

                                {/* PAIN */}
                                <div className="col-12 mt-4">
                                  <div className="form-check d-flex align-items-center gap-1 mb-2">
                                    <input
                                      className="form-check-input mt-0 shadow-none"
                                      type="checkbox"
                                      id="check-pain"
                                      checked={painChecked}
                                      onChange={(e) => {
                                        setPainChecked(e.target.checked);

                                        if (!e.target.checked)
                                          setPainValue("");
                                      }}
                                      disabled={!isEditing}
                                    />

                                    <label
                                      className="form-check-label fw-bold"
                                      htmlFor="check-pain"
                                    >
                                      Pain
                                    </label>
                                  </div>

                                  <input
                                    type="text"
                                    className="form-control rounded-1 shadow-none"
                                    value={painValue}
                                    onChange={(e) =>
                                      setPainValue(e.target.value.toUpperCase())
                                    }
                                    disabled={!painChecked || !isEditing}
                                    style={{
                                      borderColor: "var(--primary, #0f763f)",
                                    }}
                                  />
                                </div>

                                {/* OTHER */}
                                <div className="col-12 mt-3">
                                  <div className="form-check d-flex align-items-center gap-1 mb-2">
                                    <input
                                      className="form-check-input mt-0 shadow-none"
                                      type="checkbox"
                                      id="check-other"
                                      checked={otherChecked}
                                      onChange={(e) => {
                                        setOtherChecked(e.target.checked);

                                        if (!e.target.checked)
                                          setOtherValue("");
                                      }}
                                      disabled={!isEditing}
                                    />

                                    <label
                                      className="form-check-label fw-bold"
                                      htmlFor="check-other"
                                    >
                                      Other
                                    </label>
                                  </div>

                                  <input
                                    type="text"
                                    className="form-control rounded-1 shadow-none"
                                    value={otherValue}
                                    onChange={(e) =>
                                      setOtherValue(
                                        e.target.value.toUpperCase()
                                      )
                                    }
                                    disabled={!otherChecked || !isEditing}
                                    style={{
                                      borderColor: "var(--primary, #0f763f)",
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

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="acc-info-backdrop">
          <div className="acc-info-box shadow-lg">
            <div className="acc-info-title">
              <span>Confirm Delete</span>

              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => setShowDeleteModal(false)}
              />
            </div>

            <div className="d-flex align-items-center gap-3 p-4">
              <div className="acc-info-icon">
                <i className="isax isax-trash"></i>
              </div>

              <div>
                <div className="fw-bold text-dark mb-1">
                  Clear Form?
                </div>

                <div className="small fw-semibold text-muted">
                  Are you sure you want to clear the current signs and symptoms
                  form?
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 px-4 pb-3">
              <button
                type="button"
                className="btn btn-sm btn-light fw-bold px-4 border"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-sm btn-danger fw-bold px-4"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientSignsAndSymptoms;