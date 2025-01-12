"use client";

import dayjs from "dayjs";
import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import { useState } from "react";
import { useNewSessionStore } from "../_store/new-session-store";
import { useRouter } from "next/navigation";
import { generateUUID } from "../_utils/helpers";
import ChatBubble from "../_components/session/chat/ChatBubble";

const SessionHomePage = () => {
  const router = useRouter();
  const setNewSession = useNewSessionStore((state) => state.setSession);
  const [promptValue, setPromptValue] = useState("");

  const sidebarWidth = 325;
  const containerHorizontalPadding = 24;
  const pageHorizontalPadding = 40;

  const promptChat = async () => {
    const newSessionId = generateUUID();
    setNewSession({
      id: newSessionId,
      session: [
        {
          id: 1,
          message: "Hi, I'm Rowland. How can i assist you today?",
          user: "BOT",
          created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 2,
          message: promptValue,
          user: "USER",
          created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 3,
          is_new_session: true,
          question: promptValue,
          message: ".",
          user: "BOT",
          created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      ],
    });
    router.push(`/chat/${newSessionId}`);
  };

  return (
    <>
      <div
        style={{ overscrollBehavior: "contain" }}
        className="tw-h-full tw-flex tw-flex-col tw-gap-[30px] tw-px-[22px]"
      >
        <ChatBubble
          chat={{
            id: 1,
            message: "Hi, I'm Rowland. How can i assist you today?",
            user: "BOT",
            created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          }}
          sessionId="welcome"
          isStreaming={false}
          setIsStreaming={() => {}}
        />
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
