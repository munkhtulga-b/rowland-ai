import React, { Suspense } from "react";
import AuthNavBar from "../_components/auth/NavBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AuthNavBar />
        <div className="tw-flex-1 tw-grid tw-place-items-center">
          <div className="tw-max-w-[520px] tw-w-full tw-py-10 tw-px-6 md:tw-px-0">
            <Suspense fallback={<></>}>
              <>{children}</>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
