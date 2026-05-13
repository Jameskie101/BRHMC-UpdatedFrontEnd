import { Route, Routes } from "react-router";
import { authRoutes, customLayout } from "./router.link";
import AuthLayout from "../layouts/authLayout";
import CommonLayout from "@/layouts/commonLayout";
import AuthGuard from "@/components/auth-guard/AuthGuard"; //Comment to disable auth guard for testing
import GuestGuard from "@/components/auth-guard/GuestGuard";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/core/redux/authSlice";
import { Suspense, useEffect, useState } from "react";
import { publicRoutes } from "./router.link";
import Unauthorized from "@/pages/authentication/unauthorized";

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

  const filteredAuthRoutes = authRoutes.filter(
    (route) => route.path !== "/unauthorized"
  );
  return (
    <>
      <Routes>
        {publicRoutes.map((route, idx) => (
        <Route path={route.path} element={route.element} key={idx} />
          ))}

      {/* Guest-only routes (login, maintenance, error pages) */}
      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          {filteredAuthRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Route>

      {/* Unauthorized page – not guarded by GuestGuard */}
      <Route
        path="/unauthorized"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Unauthorized />
          </Suspense>
        }
      />

        {/* only Doctor can access docotr routes */} 
        <Route element = {<AuthGuard requiredRoleLevel={1} />}>  {/* Comment this line to disable auth guard for testing */}
        <Route element={<CommonLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        </Route> {/* Comment this line to disable auth guard for testing */}

        
        {/* only Nurse can access docotr routes */} 
        <Route element = {<AuthGuard requiredRoleLevel={2} />}>  {/* Comment this line to disable auth guard for testing */}
        <Route element={<CommonLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        </Route> {/* Comment this line to disable auth guard for testing */}


        {/* Not yet implemented */}
        {/* <Route element ={<AuthGuard requiredRoleLevel={0} />}> */}
        {/* only admin can access admin routes */}
        {/* <Route element={<AdminLayout />}>
          {adminRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route> 
        </Route> */}

      </Routes>
    </>
  );
};

export default ALLRoutes;
