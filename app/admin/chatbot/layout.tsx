"use client";

import React, { Suspense } from "react";
import { useWindowWidth } from "@/app/_utils/custom-hooks";

const AdminChatbotLayout = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = useWindowWidth();
  const sidebarWidth = 325;
  const pageHorizontalPadding = 40;
  const pageVerticalPadding = 0;


  return (
    <>
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
    </>
  );
};

export default AdminChatbotLayout;
