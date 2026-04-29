import { useNavigate } from "react-router";
import ImageWithBasePath from "@/components/image-with-base-path";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const handleReload = () => window.location.reload();

  return (
    <div style={{ padding: 32, textAlign: "center" }} role="alert" aria-live="assertive">
      <div style={{ marginBottom: 24 }}>
        <ImageWithBasePath
          src="assets/img/brhmclogo.png"
          alt="BRHMC Logo"
        />
      </div>
      <h2 id="unauthorized-title">Access Denied</h2>
      <p id="unauthorized-description">
        You do not have permission to view this page. Please contact your administrator if you believe this is an error.
      </p>
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "16px 0",
        }}
      >
        <button
          onClick={handleGoBack}
          className="btn btn-primary btn-sm"
          style={{ padding: "8px 16px", fontSize: 14 }}
          aria-label="Go back to previous page"
        >
          Go Back
        </button>
        <button
          onClick={handleReload}
          className="btn btn-outline-info btn-sm"
          style={{ padding: "8px 16px", fontSize: 14 }}
          aria-label="Reload the page"
        >
          Reload
        </button>
      </div>
      <details style={{ marginTop: 24, textAlign: "left", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
        <summary>Technical details</summary>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {`Error 403 – Forbidden
You tried to access: ${window.location.href}
Your role level does not meet the required permission level.

If you are logged in with the correct account, please try logging out and back in.`}
        </pre>
      </details>
    </div>
  );
};

export default Unauthorized;