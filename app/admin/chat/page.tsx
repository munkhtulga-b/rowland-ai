"use client";

import dayjs from "dayjs";
import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import { useState } from "react";
import { useNewSessionStore } from "@/app/_store/new-session-store";
import { useRouter } from "next/navigation";
import { generateUUID } from "@/app/_utils/helpers";
import ChatBubble from "@/app/_components/session/chat/ChatBubble";
import AdminChatSideBar from "@/app/_components/admin/AdminChatSideBar";

const AdminChatPage = () => {
  const router = useRouter();
  const setNewSession = useNewSessionStore((state) => state.setSession);
  const [promptValue, setPromptValue] = useState("");

  const navbarHeight = 78;
  const sidebarWidth = 325;
  const containerPaddingTop = 38;
  const containerPaddingBottom = 24;
  const containerHorizontalPadding = 24;
  const pageHorizontalPadding = 40;
  const pageVerticalPadding = 0;

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
          question: promptValue,
          message: ".",
          user: "BOT",
          created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      ],
    });
    router.push(`/admin/chat/${newSessionId}`);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 350,
          top: navbarHeight + containerPaddingTop,
          bottom: containerPaddingBottom,
          width: sidebarWidth,
        }}
      >
        <AdminChatSideBar />
      </div>
      <div className="" style={{
        marginLeft: sidebarWidth,
        paddingTop: pageVerticalPadding,
      }}
      >
        <div className="tw-bg-white tw-rounded-[26px] tw-p-10 tw-w-full tw-flex tw-flex-col tw-gap-8 tw-min-h-[800px]">
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
              setIsStreaming={() => { }}
            />
            <div
              style={{
                position: "fixed",
                left:
                  sidebarWidth + sidebarWidth + containerHorizontalPadding + pageHorizontalPadding,
                right: containerHorizontalPadding + pageHorizontalPadding,
                bottom: "30px",
              }}
            >
              <SessionChatPrompt
                promptValue={promptValue}
                setPromptValue={setPromptValue}
                sendQuestion={promptChat}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChatPage;
