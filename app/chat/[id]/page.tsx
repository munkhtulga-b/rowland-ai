"use client";

import $api from "@/app/_api";
import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import ChatBubble from "@/app/_components/session/chat/ChatBubble";
import { TypeChatbotResponse, TypeChat } from "@/app/_types/chat/TypeChat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};

const ChatSessionPage = () => {
  const params = useParams<Params>();
  const { id } = params;

  const sidebarWidth = 325;
  const pageHorizontalPadding = 40;
  const containerHorizontalPadding = 24;

  const [chats, setChats] = useState<TypeChat[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [promptValue, setPromptValue] = useState("");

  useEffect(() => {
    setIsFetching(false);
    console.log(id);
  }, []);

  const promptChat = async () => {
    const shallow = [...chats];
    shallow.push({
      id: shallow.length + 1,
      message: promptValue,
      user: "USER",
    });
    setChats(shallow);
    setTimeout(() => {
      scrollToBottom();
    }, 500);
    setIsSending(true);
    const resp = await $api.chat.prompt(
      promptValue,
      "ecc0f9a9-2d3c-41e8-ab6e-561689af5705"
    );
    const data: TypeChatbotResponse = await resp.json();
    if (data?.status === "Success") {
      setPromptValue("");
      shallow.push({
        id: shallow.length + 1,
        message: data?.data?.message,
        user: "BOT",
      });
      setChats(shallow);
    }
    setIsSending(false);
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
              <ChatBubble key={chat?.id} chat={chat} />
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
            isSending={isSending}
          />
        </div>
      </div>
    </>
  );
};

export default ChatSessionPage;