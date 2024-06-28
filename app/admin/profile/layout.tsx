"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useWindowWidth } from "@/app/_utils/custom-hooks";
import ProfileNavBar from "@/app/_components/user/ProfileNavBar";

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const windowWidth = useWindowWidth();
  const navbarHeight = 78;
  const containerPaddingTop = 38;
  const containerPaddingBottom = 24;
  const containerHorizontalPadding = 24;

  useEffect(() => {
    if (windowWidth) {
      setIsMounted(true);
    }
  }, [windowWidth]);

  return (
    <>
      {isMounted ? (
        <div
          style={{ minHeight: "100svh" }}
          className="tw-bg-white tw-flex tw-flex-col"
        >
          <section className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[999]">
            <ProfileNavBar height={navbarHeight} />
          </section>
          <section
            style={{
              marginTop: navbarHeight,
              paddingTop: containerPaddingTop,
              paddingBottom: containerPaddingBottom,
              paddingLeft: containerHorizontalPadding,
              paddingRight: containerHorizontalPadding,
            }}
            className="tw-flex-1 tw-flex tw-justify-center tw-gap-10"
          >
            <div className="tw-flex">
              <Suspense fallback={<></>}>{children}</Suspense>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default SessionLayout;
