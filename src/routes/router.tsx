import { Route, Routes } from "react-router";
import { authRoutes, customLayout, publicRoutes } from "./router.link";
import MainLayout from "../layouts/mainLayout";
import AuthLayout from "../layouts/authLayout";
import CommonLayout from "@/layouts/commonLayout";

const ALLRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<CommonLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<MainLayout />}>
          {customLayout.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
