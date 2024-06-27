"use client";

import SessionChatPrompt from "@/app/_components/session/ChatPrompt";
import ChatBubble from "@/app/_components/session/chat/ChatBubble";
import { TypeHistoryChat, TypePromtChat } from "@/app/_types/chat/TypeChat";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import $api from "@/app/_api";
import HistoryChatBubble from "@/app/_components/session/chat/HistoryChatBubble";
import { useNewSessionStore } from "@/app/_store/new-session-store";

const ChatSessionPage = () => {
  const { id: sessionId }: { id: string } = useParams();

  const getNewSession = useNewSessionStore((state) => state.getSession());
  const setNewSession = useNewSessionStore((state) => state.setSession);

  const [historyChats, setHistoryChats] = useState<TypeHistoryChat[]>([]);
  const [chats, setChats] = useState<TypePromtChat[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [promptValue, setPromptValue] = useState("");

  const sidebarWidth = 325;
  const containerHorizontalPadding = 24;
  const pageHorizontalPadding = 40;

  useEffect(() => {
    if (getNewSession && getNewSession.session) {
      handleNewSession(getNewSession.session);
    } else {
      fetchHistoryChats();
    }
  }, []);

  const fetchHistoryChats = async () => {
    setIsFetching(true);
    const { isOk, data } = await $api.user.chat.getOne(sessionId, {
      sortBy: "created_at",
      sortType: "asc",
    });
    if (isOk) {
      setHistoryChats(data);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
    setIsFetching(false);
  };

  const handleNewSession = (sessionChats: TypePromtChat[]) => {
    setChats(sessionChats);
    setNewSession(null);
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
            {historyChats.length ? (
              <>
                {historyChats.map((chat) => (
                  <HistoryChatBubble key={chat.id} chat={chat} />
                ))}
              </>
            ) : null}
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
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </>
  );
};

export default ChatSessionPage;
