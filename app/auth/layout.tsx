import React from "react";
import AuthNavBar from "../_components/auth/NavBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AuthNavBar />
        <div className="tw-flex-1 tw-grid tw-place-items-center tw-py-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
