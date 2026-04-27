// src/components/header/headerNav.tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { headerNavData, type NavItem } from "../../data/headerData";

const HeaderNav = () => {
  const location = useLocation();
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 992
  );

  // Watch for viewport changes so we only run the submenu toggle on mobile
  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth < 992;
      setIsMobileNav(nextIsMobile);
      if (!nextIsMobile) setOpenSubmenuId(null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set active class based on current route
  const isActive = (item: NavItem): boolean => {
    const itemPath = item.path;

    // Exact match
    if (itemPath && location.pathname === itemPath) return true;

    // Child route match (e.g., /appointments/123)
    if (itemPath && location.pathname.startsWith(`${itemPath}/`)) return true;

    // Relative links (if defined)
    if (item.relativeLinks && item.relativeLinks.includes(location.pathname))
      return true;

    // Check children recursively
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  // Render a single link (either <Link> or <a> for external)
  const renderLinkElement = (item: NavItem, className?: string, children?: ReactNode) => {
    const activeClass = isActive(item) ? "active" : "";
    const fullClass = [className, activeClass].filter(Boolean).join(" ");

    if (item.target === "_blank") {
      return (
        <a
          href={item.path}
          className={fullClass || undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children ?? item.title}
        </a>
      );
    }

    return (
      <Link to={item.path} className={fullClass || undefined}>
        {children ?? item.title}
      </Link>
    );
  };

  // Render a simple dropdown menu (no mega‑menu, no columns)
  const renderSubmenu = (children: NavItem[], isOpen: boolean) => {
    const style = isMobileNav ? { display: isOpen ? "block" : "none" } : {};
    return (
      <ul className="submenu" style={style}>
        {children.map((child) => (
          <li key={child.id} className={isActive(child) ? "active" : ""}>
            {renderLinkElement(child)}
          </li>
        ))}
      </ul>
    );
  };

  // Render navigation items recursively
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openSubmenuId === item.id;

      const liClass = [
        hasChildren ? "has-submenu" : "",
        isActive(item) ? "active" : "",
        item.className || "",
      ]
        .filter(Boolean)
        .join(" ");

      const parentLinkClass = ["main-menu", isActive(item) ? "active" : ""]
        .filter(Boolean)
        .join(" ");

      const handleParentClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      ) => {
        if (!hasChildren) return;
        // Only toggle submenu on mobile; desktop stays hover‑based
        if (!isMobileNav) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        setOpenSubmenuId((prev) => (prev === item.id ? null : item.id));
      };

      return (
        <li key={item.id} className={liClass}>
          {hasChildren ? (
            <>
              <Link
                to="#"
                className={parentLinkClass}
                onClick={handleParentClick}
              >
                {item.title}
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </Link>
              {renderSubmenu(item.children!, isOpen)}
            </>
          ) : (
            renderLinkElement(item, parentLinkClass)
          )}
        </li>
      );
    });
  };

  return <ul className="main-nav">{renderNavItems(headerNavData)}</ul>;
};

export default HeaderNav;