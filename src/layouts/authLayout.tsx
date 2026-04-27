import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="main-wrapper">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
