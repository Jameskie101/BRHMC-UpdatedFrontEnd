import { Link, useLocation } from "react-router";

import { doctorSidebarData } from "@/core/data/json/doctorSidebarData";

const DoctorSidebar = () => {
  const location = useLocation();

    const isActive = (item: typeof doctorSidebarData[0]) => {
    const itemPath = item.path;
    if (location.pathname === itemPath) return true;
    if (location.pathname.startsWith(`${itemPath}/`)) return true;
    if (item.relativeLinks?.includes(location.pathname)) return true;
    return false;
  };

  return (
    <div className="col-lg-4 col-xl-3 d-none d-lg-block">
      <div className="profile-sidebar doctor-sidebar profile-sidebar-new theiaStickySidebar">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget justify-content-center">
            <div className="profile-det-info text-center">
              <div className="mb-3" style={{ fontSize: '3rem', opacity: 0.8 }}>
                <i className="fa-regular fa-copy"></i>
              </div>
              <h3 className="text-uppercase fw-bold mt-2" style={{ letterSpacing: '1px' }}>
                Patient Form
              </h3>
              <div className="patient-details mt-2">
                <p className="small text-muted mb-0">Electronic Medical Record Utility</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
              {doctorSidebarData.map((item) => (
                <li key={item.path} className={isActive(item) ? "active" : ""}>
                  <Link to={item.path}>
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {item.badge && <small className="unread-msg">{item.badge}</small>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;