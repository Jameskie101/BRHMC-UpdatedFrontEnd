import { Outlet, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
import { useEffect, useRef } from "react";
import {
  resetMobileSidebar,
  setMobileSidebar,
} from "../core/redux/sidebarSlice";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useMobileSidebarOverlay } from "../hooks/useMobileSidebarOverlay";
import type { RootState } from "../core/redux/store";
import type { SidebarState } from "../core/redux/sidebarSlice";
import ScrollToTop from "../components/scroll-to-top/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { mobileSidebar } = useAppSelector(
    (state: RootState) => state.sidebar as SidebarState
  );

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isLayoutFullwidth = location.pathname === "/layout-fullwidth"; // kept but likely never true

  // Mobile sidebar overlay handling
  useMobileSidebarOverlay({
    mobileSidebar,
    isLayoutFullwidth,
    isMobile,
    containerRef: mainWrapperRef,
    onClose: () => dispatch(setMobileSidebar(false)),
  });

  // Reset sidebar state when route changes
  useEffect(() => {
    dispatch(resetMobileSidebar());
  }, [location.pathname, dispatch]);

  return (
    <>
      <div className="main-wrapper" ref={mainWrapperRef}>
        <Outlet />
      </div>
      <div className={`sidebar-overlay${mobileSidebar ? " opened" : ""}`} />
      <ScrollToTop />
    </>
  );
};

export default MainLayout;