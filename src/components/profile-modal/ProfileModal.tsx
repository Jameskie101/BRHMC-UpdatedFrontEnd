import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "@/core/redux/authSlice";
import { all_routes } from "@/routes/all_routes";
import type { RootState } from "@/core/redux/store";
import { useEffect, useState, useRef } from "react";
import { getRoleName } from "@/services/roleService";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const profileRef = useRef<HTMLLIElement>(null);

  const userEmail = localStorage.getItem("userEmail") || "User";
  const roleLevel = auth.roleLevel;
  const [roleName, setRoleName] = useState<string>("User");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // Fetch role name when roleLevel changes
  useEffect(() => {
    if (roleLevel !== null && roleLevel !== undefined) {
      getRoleName(roleLevel).then(setRoleName).catch(() => setRoleName("User"));
    } else {
      setRoleName("User");
    }
  }, [roleLevel]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsCollapsed(true);
      }
    };

    if (!isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCollapsed]);

  const handleLogout = () => {
    setIsCollapsed(true);
    setTimeout(() => {
      dispatch(logout());
      navigate(all_routes.login);
    }, 200);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <li className="nav-item profile-icon" style={{ position: "relative" }} ref={profileRef}>
        <button
          className="profile-btn"
          onClick={toggleCollapse}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-expanded={!isCollapsed}
        >
          <i className="fa-solid fa-user" />
        </button>

        {!isCollapsed && (
          <div className="profile-dropdown" style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            minWidth: "280px",
            maxWidth: "calc(100vw - 40px)",
            width: "300px",
            padding: "16px",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h6 style={{ margin: 0 }}>My Profile</h6>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsCollapsed(true)}
                aria-label="Close"
                style={{ padding: "4px" }}
              />
            </div>

            <div className="profile-avatar mb-3">
              <div className="avatar-circle">
                <i className="feather-user" />
              </div>
            </div>
            <div className="profile-info">
              <h6 className="mb-1">{userEmail}</h6>
              <p className="text-muted small mb-3">
                Role: <strong>{roleName}</strong>
              </p>
            </div>
            <hr className="my-3" />
            <button type="button" className="btn btn-profile-logout w-100" onClick={handleLogout}>
              <i className="feather-log-out me-2" />
              Logout
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default ProfileModal;