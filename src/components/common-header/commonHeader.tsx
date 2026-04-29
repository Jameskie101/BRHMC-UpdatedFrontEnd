import { Link } from "react-router";
import ImageWithBasePath from "../image-with-base-path";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMobileSidebar } from "@/core/redux/sidebarSlice";
import HeaderNav from "../header/headerNav";
import { all_routes } from "@/routes/all_routes";
import { Offcanvas } from "bootstrap";
import ProfileModal from "../profile-modal/ProfileModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  // Scroll detection – from CommonHeader
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Offcanvas mobile menu handler – both headers used the same logic
  const onMobileBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    const offcanvasEl = document.getElementById("support_item");
    if (offcanvasEl) {
      const bsOffcanvas =
        Offcanvas.getInstance(offcanvasEl) ?? new Offcanvas(offcanvasEl);
      bsOffcanvas.show();
    }
  };

  const onMenuClose = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setMobileSidebar(false));
  };

  return (
    <header
      className={`header header-default inner-header ${isScrolled ? "fixed" : ""}`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav">
          {/* Mobile button + logo area */}
          <div className="navbar-header">
            <Link id="mobile_btn" to="#" onClick={onMobileBtn}>
              <i className="fa-solid fa-bars" />
            </Link>

            <Link to={all_routes.doctorDashboard} className="navbar-brand logo">
              <h2 className="logo-name">BRHMC</h2>
              <ImageWithBasePath
                src="assets/img/brhmclogo.png"
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="header-menu">
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to={all_routes.doctorDashboard} className="menu-logo">
                  <h2 className="logo-name">BRHMC</h2>
                  <ImageWithBasePath
                    src="assets/img/brhmclogo.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link
                  id="menu_close"
                  className="menu-close"
                  to="#"
                  onClick={onMenuClose}
                >
                  <i className="fas fa-times" />
                </Link>
              </div>
              <HeaderNav />
            </div>
          </div>

          {/* Right side icons */}
          <ul className="nav header-navbar-rht ">
            <ProfileModal />
            <li>
              <Link
                to="#"
                className="details-btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#support_item"
              >
                <i className="fa-solid fa-bars" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;