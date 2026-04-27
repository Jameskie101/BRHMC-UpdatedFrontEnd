import CommonFooter from "@/components/common-footer/commonFooter";
import CustomOffcanvas from "@/components/custom-offcanvas/customOffcanvas";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import type { RootState } from "@/core/redux/store";
import {
  resetMobileSidebar,
  setMobileSidebar,
  type SidebarState,
} from "@/core/redux/sidebarSlice";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useBootstrapTooltips } from "@/hooks/useBootstrapTooltips";
import { useMobileSidebarOverlay } from "@/hooks/useMobileSidebarOverlay";
// Import the unified Header (which is now in common-header)
import CommonHeader from "@/components/common-header/commonHeader";

const CommonLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { mobileSidebar } = useAppSelector(
    (state: RootState) => state.sidebar as SidebarState
  );

  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isLayoutFullwidth = location.pathname === "/layout-fullwidth";

  // Tooltips initialization
  useBootstrapTooltips([location.pathname]);

  // Mobile sidebar overlay and outside click handling
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
    <div className="main-wrapper">
      <CommonHeader />
      <div className="page-content">
        <Outlet />
      </div>
      <CommonFooter />
      <CustomOffcanvas />
    </div>
  );
};

export default CommonLayout;