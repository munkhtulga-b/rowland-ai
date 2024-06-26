"use client";

import React, { Suspense, useEffect, useState } from "react";
import SessionNavBar from "../_components/session/NavBar";
import { useWindowWidth } from "../_utils/custom-hooks";
import SessionSideBar from "../_components/session/SideBar";

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const windowWidth = useWindowWidth();
  const navbarHeight = 78;
  const sidebarWidth = 325;
  const containerPaddingTop = 38;
  const containerPaddingBottom = 24;
  const containerHorizontalPadding = 24;
  const pageHorizontalPadding = 40;
  const pageVerticalPadding = 0;

  useEffect(() => {
    if (windowWidth) {
      setIsMounted(true);
    }
  }, [windowWidth]);

  return (
    <>
      {isMounted ? (
        <div style={{ minHeight: "100svh" }} className="tw-flex tw-flex-col">
          <section className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[999]">
            <SessionNavBar height={navbarHeight} />
          </section>
          <section
            style={{
              marginTop: navbarHeight,
              paddingTop: containerPaddingTop,
              paddingBottom: containerPaddingBottom,
              paddingLeft: containerHorizontalPadding,
              paddingRight: containerHorizontalPadding,
            }}
            className="tw-flex-1 tw-flex tw-justify-start"
          >
            <div
              style={{
                position: "fixed",
                left: 24,
                top: navbarHeight + containerPaddingTop,
                bottom: containerPaddingBottom,
                width: sidebarWidth,
              }}
            >
              <SessionSideBar />
            </div>
            <div
              style={{
                marginLeft: sidebarWidth,
                marginBottom: windowWidth < 768 ? 180 : 150,
                paddingTop: pageVerticalPadding,
                paddingLeft: windowWidth < 768 ? 0 : pageHorizontalPadding,
                paddingRight: windowWidth < 768 ? 0 : pageHorizontalPadding,
              }}
              className="tw-grow"
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
