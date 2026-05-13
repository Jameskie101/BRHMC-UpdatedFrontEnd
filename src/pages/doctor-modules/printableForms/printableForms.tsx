import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// printable forms component
const PrintableForms = () => {
  const [activeForm, setActiveForm] = useState("Patient History");
  const [zoom, setZoom] = useState(100);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // hook to navigate back to the previous page
  const navigate = useNavigate();

  const forms = [
    "Please wait . . .",
    "Patient History",
    "Discharge Instruction",
    "Discharge Summary",
    "Medical Abstract",
    "Claim Form 4",
    "Archive File"
  ];

  // handle print current iframe page
  const handlePrintCurrent = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  // handle print all
  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div className="d-flex vh-100 w-100 bg-secondary bg-opacity-10">
      {/* dark sidebar */}
      <div 
        className="text-white d-flex flex-column flex-shrink-0" 
        style={{ width: "230px", backgroundColor: "#000" }}
      >
        <div className="p-4 mb-2 text-end">
          <h4 className="mb-0 text-white" style={{ fontStyle: "italic", fontWeight: "300" }}>
            <span className="fw-bold">i</span>HOMIS
          </h4>
          <small className="text-muted d-block mt-n1" style={{ fontSize: "0.75rem" }}>
            Doctor's Module
          </small>
        </div>

        <div className="flex-grow-1 mt-2">
          <ul className="nav flex-column text-end">
            {forms.map((form) => (
              <li key={form} className="nav-item">
                <button
                  className={`btn btn-link text-white text-decoration-none w-100 text-end pe-4 py-2 rounded-0 ${
                    activeForm === form ? "bg-secondary bg-opacity-50 border-start border-4 border-info" : ""
                  }`}
                  style={{ fontSize: "0.85rem", opacity: activeForm === form ? 1 : 0.7 }}
                  onClick={() => setActiveForm(form)}
                >
                  {form}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 d-flex flex-column align-items-center gap-4 mt-auto">
          <button
            className="btn btn-link text-white text-decoration-none d-flex flex-column align-items-center p-0"
            onClick={handlePrintCurrent}
            style={{ opacity: 0.8 }}
          >
            <i className="isax isax-printer fs-2 mb-2" />
            <span style={{ fontSize: "0.75rem" }}>Print Current Page</span>
          </button>
          
          <button
            className="btn btn-link text-white text-decoration-none d-flex flex-column align-items-center p-0"
            onClick={handlePrintAll}
            style={{ opacity: 0.8 }}
          >
            <i className="isax isax-document-copy fs-2 mb-2" />
            <span style={{ fontSize: "0.75rem" }}>Print All</span>
          </button>

          <div className="w-100 border-top border-secondary my-2 opacity-50"></div>
          
        
        </div>
      </div>

      {/* main preview area */}
      <div className="flex-grow-1 d-flex flex-column bg-light" style={{ overflow: "hidden" }}>
        
        {/* toolbar */}
        <div className="bg-white px-3 py-2 border-bottom d-flex align-items-center shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              className="form-control form-control-sm text-center"
              style={{ width: "70px" }}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              min="10"
              max="200"
            />
            <span className="small text-muted" style={{ fontSize: "0.8rem" }}>Page Zoom</span>
              {/* exit button to go back to last page */}\
              
          <button
            className="btn btn-link text-danger text-decoration-none d-flex flex-column align-items-left p-0"
            onClick={() => navigate(-1)}
            style={{ opacity: 0.9 }}
          >
            <i className="isax isax-arrow-left-2 fs-2 mb-2" />
            <span style={{ fontSize: "0.75rem" }}>Exit</span>
          </button>
          </div>
          
        </div>

        {/* document preview container */}
        <div className="flex-grow-1 p-4 overflow-auto d-flex justify-content-center">
          <div
            className="bg-white shadow-sm transition-transform"
            style={{
              width: "21cm",
              minHeight: "29.7cm",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
            }}
          >
            {/* iframe loading the specific html printable */}
            <iframe
              ref={iframeRef}
              src="/src/pages/doctor-modules/printableForms/testprint.html"
              title="Print Preview"
              className="w-100 h-100 border-0"
              style={{ minHeight: "29.7cm" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableForms;