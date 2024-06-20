"use client";

import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import ChatBubble from "@/app/_components/session/chat/ChatBubble";
import { TypeChat } from "@/app/_types/chat/TypeChat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Params = {
  id: string;
};

const ChatSessionPage = () => {
  const params = useParams<Params>();
  const { id } = params;

  // const sidebarWidth = 325;
  const sidebarWidth = 0;
  const pageHorizontalPadding = 40;
  const containerHorizontalPadding = 24;

  const [chats, setChats] = useState<TypeChat[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [promptValue, setPromptValue] = useState("");

  useEffect(() => {
    setChats([
      {
        id: 1,
        message: "Hi, I'm Rowland. How can i assist you today?",
        user: "BOT",
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
    setIsFetching(false);
    console.log(id);
  }, []);

  const promptChat = async () => {
    const shallow = [...chats];
    shallow.push(
      {
        id: shallow.length + 1,
        message: promptValue,
        user: "USER",
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id: shallow.length + 2,
        question: promptValue,
        message: ".",
        user: "BOT",
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }
    );
    setChats(shallow);
    setPromptValue("");
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // You can use 'auto' for an instant scroll
    });
  };

  return (
    <>
      <div className="tw-h-full tw-flex tw-flex-col tw-gap-[30px] tw-px-[22px]">
        {!isFetching ? (
          <>
            {chats.map((chat) => (
              <ChatBubble
                key={chat?.id}
                chat={chat}
                isStreaming={isStreaming}
                setIsStreaming={(value: boolean) => setIsStreaming(value)}
              />
            ))}
          </>
        ) : null}
        <div
          style={{
            position: "fixed",
            left:
              sidebarWidth + pageHorizontalPadding + containerHorizontalPadding,
            right: pageHorizontalPadding + containerHorizontalPadding,
            bottom: 0,
          }}
        >
          <SessionChatPrompt
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            sendQuestion={promptChat}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </>
  );
};

export default ChatSessionPage;
