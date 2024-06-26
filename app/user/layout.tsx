"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useWindowWidth } from "../_utils/custom-hooks";
import ProfileNavBar from "../_components/user/ProfileNavBar";

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const windowWidth = useWindowWidth();
  const navbarHeight = 78;
  // const sidebarWidth = 320;
  const containerPaddingTop = 38;
  const containerPaddingBottom = 24;
  const containerHorizontalPadding = 24;
  // const pageHorizontalPadding = 40;
  const pageVerticalPadding = 0;

  useEffect(() => {
    if (windowWidth) {
      setIsMounted(true);
    }
  }, [windowWidth]);

  return (
    <>
      {isMounted ? (
        <div style={{ minHeight: "100svh" }} className="tw-bg-white tw-flex tw-flex-col">
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
            <div
              style={{
                // marginLeft: sidebarWidth,
                marginBottom: windowWidth < 768 ? 180 : 150,
                paddingTop: pageVerticalPadding,
                // paddingLeft: windowWidth < 768 ? 0 : pageHorizontalPadding,
                // paddingRight: windowWidth < 768 ? 0 : pageHorizontalPadding,
              }}
              // className="tw-grow"
            >
              <Suspense fallback={<></>}>{children}</Suspense>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default SessionLayout;
