"use client";

import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import ChatBubble from "@/app/_components/session/chat/ChatBubble";
import { TypeChat } from "@/app/_types/chat/TypeChat";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { generateUUID } from "@/app/_utils/helpers";
import $api from "@/app/_api";

const ChatSessionPage = () => {
  const [sessionId, setSessionId] = useState("");

  const [chats, setChats] = useState<TypeChat[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [promptValue, setPromptValue] = useState("");

  useEffect(() => {
    fetchHistory();
    setSessionId(generateUUID());
    setChats([
      {
        id: 1,
        message: "Hi, I'm Rowland. How can i assist you today?",
        user: "BOT",
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);
    setIsFetching(false);
  }, []);

  const fetchHistory = async () => {
    const { isOk, data } = await $api.user.chat.getMany();
    if (isOk) {
      console.log(data);
    }
  };

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
      <div
        style={{ overscrollBehavior: "contain" }}
        className="tw-h-full tw-flex tw-flex-col tw-gap-[30px] tw-px-[22px]"
      >
        {!isFetching ? (
          <>
            {chats.map((chat) => (
              <ChatBubble
                key={chat?.id}
                chat={chat}
                sessionId={sessionId}
                isStreaming={isStreaming}
                setIsStreaming={(value: boolean) => setIsStreaming(value)}
              />
            ))}
          </>
        ) : null}
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
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
