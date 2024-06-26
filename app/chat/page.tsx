"use client";

import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import { useState } from "react";

const SessionHomePage = () => {
  const [promptValue, setPromptValue] = useState("");

  const sidebarWidth = 325;
  const containerHorizontalPadding = 24;
  const pageHorizontalPadding = 40;

  const promptChat = async () => {
    console.log("Prompt");
  };

  return (
    <>
      <div
        style={{ overscrollBehavior: "contain" }}
        className="tw-h-full tw-flex tw-flex-col tw-gap-[30px] tw-px-[22px]"
      >
        No chat content
        <div
          style={{
            position: "fixed",
            left:
              sidebarWidth + containerHorizontalPadding + pageHorizontalPadding,
            right: containerHorizontalPadding + pageHorizontalPadding,
            bottom: 0,
          }}
        >
          <SessionChatPrompt
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            sendQuestion={promptChat}
          />
        </div>
      </div>
    </>
  );
};

export default SessionHomePage;
