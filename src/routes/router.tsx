import { Route, Routes } from "react-router";
import { authRoutes, customLayout } from "./router.link";
import MainLayout from "../layouts/mainLayout";
import AuthLayout from "../layouts/authLayout";
import CommonLayout from "@/layouts/commonLayout";
import AuthGuard from "@/components/auth-guard/AuthGuard"; //Comment to disable auth guard for testing
import GuestGuard from "@/components/auth-guard/GuestGuard";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/core/redux/authSlice";
import { useEffect, useState } from "react";

const ALLRoutes: React.FC = () => {
  const dispatch = useDispatch();
const [isRestoring, setIsRestoring] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  const roleLevelStr = localStorage.getItem("roleLevel");
  if (token && roleLevelStr) {
    dispatch(setCredentials({ token, roleLevel: parseInt(roleLevelStr, 10) }));
  }
  setIsRestoring(false);
}, [dispatch]);

if (isRestoring) {
  return <div>Loading...</div>;
}
  return (
    <>
      <Routes>

        <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}> {/* Comment this line to disable auth guard for testing */}
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        </Route>

        {/* only Doctors and admin can access docotr routes */} 
        <Route element = {<AuthGuard requiredRoleLevel={1} />}>  {/* Comment this line to disable auth guard for testing */}
        <Route element={<CommonLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        </Route> {/* Comment this line to disable auth guard for testing */}

        {/* not yet implemented */}
        {/* <Route element ={<AuthGuard requiredRoleLevel={0} />}> */}
        {/* only admin can access admin routes */}
        {/* <Route element={<AdminLayout />}>
          {adminRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route> 
        </Route> */}

        <Route element ={<AuthGuard requiredRoleLevel={0} />}>
        <Route element={<MainLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
