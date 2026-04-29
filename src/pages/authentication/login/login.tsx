import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCredentials } from "@/core/redux/authSlice";
import { all_routes } from "@/routes/all_routes";
import ImageWithBasePath from "@/components/image-with-base-path";
import { login } from "@/services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, roleLevel, email: userEmail } = await login(email, password);
      dispatch(setCredentials({ token, roleLevel }));
      localStorage.setItem("token", token);
      localStorage.setItem("roleLevel", String(roleLevel));
      localStorage.setItem("userEmail", userEmail);
      navigate(all_routes.doctorDashboard, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                {/* Logo centered on mobile, left-aligned on larger screens */}
                <div className="text-center text-md-start mb-4">
                  <ImageWithBasePath
                    src="assets/img/brhmclogo.png"
                    alt="BRHMC Logo"
                    className="login-logo-img img-fluid"
                  />
                  <h2 className="mt-3 mb-1 fw-bold text-primary">Welcome Back</h2>
                  <p className="text-muted small">Sign in to continue</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="doctor@brhmc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold small">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                     BRHMC © {new Date().getFullYear()} Integrated Hospital Operations & Management System
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;