import "katex/dist/katex.min.css";
import "./markdown.css";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import dayjs from "dayjs";
import { preprocessLaTeX } from "@/app/_utils/helpers";
import { useEffect, useRef, useState } from "react";
import { Readable } from "readable-stream";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { TypePromtChat } from "@/app/_types/chat/TypeChat";
import _EEnumChatFeedback from "@/app/_enums/EEnumChatFeedback";
import $api from "@/app/_api";
import ChatFeedback from "./ChatFeedback";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
import { useNewSessionStore } from "@/app/_store/new-session-store";
import { redirectUnauthorized } from "@/app/_api/actions";

type NotificationPlacement = NotificationArgsProps["placement"];

const ChatBubble = ({
  chat,
  sessionId,
  isStreaming,
  setIsStreaming,
}: {
  chat: TypePromtChat;
  sessionId: string;
  isStreaming: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsStreaming: (value: boolean) => void;
}) => {
  const isInitialMount = useRef(true);
  const user = Cookies.get("user");
  const [api, contextHolder] = notification.useNotification();

  const [streamMessage, setStreamMessage] = useState("");
  const [answerId, setAnswerId] = useState<number | null>(null);
  const setNewSession = useNewSessionStore((state) => state.setSession);

  const [sentFeedback, setSentFeedback] = useState<
    _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE | null
  >(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [hasFeedbackMessage, setHasFeedbackMessage] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      streamChat();
    } else {
      if (isInitialMount.current === true) {
        isInitialMount.current = false;
      } else {
        streamChat();
      }
    }
  }, [chat]);

  useEffect(() => {
    if (sentFeedback !== null) {
      scrollToBottom();
    }
  }, [sentFeedback]);

  const handleFeedback = async (rating: number, message?: string) => {
    if (!answerId) return;
    if (rating === _EEnumChatFeedback._LIKE) {
      const { isOk } = await $api.user.feedback.send({
        answer_id: answerId,
        rate: rating,
      });
      if (isOk) {
        setSentFeedback(rating);
        openNotification("bottom");
      }
    } else {
      setIsSending(true);
      const { isOk } = await $api.user.feedback.send({
        answer_id: answerId,
        rate: rating,
        message: message,
      });
      if (isOk) {
        setHasFeedbackMessage(true);
        openNotification("bottom");
      }
      setIsSending(false);
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Thank you for your feedback!`,
      placement,
    });
  };
  const fetchProtectedResource = async () => {
    const requestHeaders = {
      "Content-Type": "application/json",
    };
    const endpoint = process.env.NEXT_PUBLIC_BASE_API_URL;
    const response = await fetch(`${endpoint}auth/protected`, {
      method: "GET",
      headers: requestHeaders,
      credentials: process.env.NODE_ENV === "development" ? "omit" : "include",
    });

    return response;
  };
  const checkAuthorization = async () => {
    const requestHeaders = {
      "Content-Type": "application/json",
    };
    const endpoint = process.env.NEXT_PUBLIC_BASE_API_URL;

    let response = await fetchProtectedResource();

    if (response.status === 401) {
      let _refreshToken;
      if (process.env.NODE_ENV === "development") {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          redirectUnauthorized();
          return false;
        }
        _refreshToken = refreshToken;
      }

      await fetch(`${endpoint}auth/refresh-tokens`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ refreshToken: _refreshToken }),
        credentials:
          process.env.NODE_ENV === "development" ? "omit" : "include",
      });

      response = await fetchProtectedResource();

      if (response.status === 200) return true;

      redirectUnauthorized();
      return false;
    }

    return true;
  };
  const streamChat = async () => {
    if (!chat.question || isStreaming) return;
    const isOk = await checkAuthorization();

    if (isOk === false) {
      return;
    }
    console.log("STREAMING");
    setIsStreaming(true);
    const body = {
      question: chat.question,
      session_id: sessionId,
    };

    const urlEncodedBody = new URLSearchParams(body).toString();
    const endpoint = process.env.NEXT_PUBLIC_BASE_API_URL;

    // eslint-disable-next-line no-undef
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (process.env.NODE_ENV === "development") {
      const accessToken = Cookies.get("token");
      if (accessToken) {
        requestHeaders["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    const resp = await fetch(`${endpoint}chat/stream`, {
      method: "POST",
      body: urlEncodedBody,
      headers: requestHeaders,
      credentials: process.env.NODE_ENV === "development" ? "omit" : "include",
    });

    if (resp.body) {
      setStreamMessage("");
      const reader = resp.body.getReader();
      let text = "";
      const stream = new Readable({
        async read() {
          const { done, value } = await reader.read();
          if (done) {
            scrollToBottom();
            this.push(null);
            setIsStreaming(false);
            if (chat.is_new_session) {
              setNewSession({
                id: sessionId,
                session: null,
                history: {
                  id: sessionId,
                  session_id: sessionId,
                  summary: text,
                  created_at: dayjs().format("YYYY-MM-DD"),
                },
              });
            }
          } else {
            this.push(Buffer.from(value));
            const stringValue = Buffer.from(value).toString("utf-8");
            if (stringValue.match(/%%([^%]+)%%/g)) {
              if (!isNaN(Number(stringValue.replace(/%/g, "")))) {
                setAnswerId(Number(stringValue.replace(/%/g, "")));
              } else {
                setStreamMessage((prev) => prev + stringValue.split("%")[0]);
                const matched = stringValue.match(/%(\d+)%/);
                if (matched?.length) {
                  const id = matched[1];
                  setAnswerId(Number(id));
                }
              }
            } else {
              text += stringValue;
              setStreamMessage(
                (prev) => prev + Buffer.from(value).toString("utf-8")
              );
            }
          }
        },
      });

      stream.on("data", (data) => {
        return data;
      });
    } else {
      toast.error("An error occurred. Please try again.");
      setIsStreaming(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // You can use 'auto' for an instant scroll
    });
  };

  return (
    <>
      {contextHolder}
      <div
        className={`tw-w-fit ${
          chat?.user === "USER" ? "tw-self-end" : "tw-self-start"
        } tw-flex tw-flex-col tw-justify-end`}
      >
        <section
          className={`tw-flex ${
            chat?.user === "USER"
              ? "tw-justify-end tw-mr-6"
              : "tw-justify-start tw-ml-6"
          } tw-items-end tw-gap-2`}
        >
          <span>
            {chat?.user === "USER"
              ? user === "jjohnson@futureprooftech.com"
                ? "Jerris"
                : "You"
              : "Rowland"}
          </span>
          <span className="tw-text-xs tw-text-primaryGray tw-w-fit">
            {dayjs(chat?.created_at).format("DD MMM hh:mm A")}
          </span>
        </section>
        <motion.section className="tw-flex tw-flex-col tw-gap-y-4 tw-p-4 tw-rounded-2xl tw-bg-grayLight tw-relative tw-transition-all tw-duration-100">
          <div
            className={`tw-absolute tw-top-[-22px] ${
              chat?.user === "USER" ? "tw-right-[-22px]" : "tw-left-[-22px]"
            } tw-bg-secondary tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center tw-overflow-clip`}
          >
            {chat?.user === "USER" ? (
              <>
                {user === "jjohnson@futureprooftech.com" ? (
                  <Image
                    src="/assets/chat/jerris.jfif"
                    alt="user-icon"
                    width={44}
                    height={44}
                    unoptimized
                    priority
                  />
                ) : (
                  <Image
                    src={`/assets/chat/user-icon.svg`}
                    alt="user-icon"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
              </>
            ) : (
              <Image
                src={`/assets/chat/rowland-ai-icon.svg`}
                alt="user-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </div>
          {!chat.question ? (
            <p className="tw-text-base">{chat?.message}</p>
          ) : (
            <>
              {streamMessage.length ? (
                <>
                  <Markdown
                    // eslint-disable-next-line react/no-children-prop
                    children={preprocessLaTeX(streamMessage)}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    className={"tw-text-base"}
                  />
                  {answerId && (
                    <ChatFeedback
                      answerId={answerId}
                      sentFeedback={sentFeedback}
                      setSentFeedback={setSentFeedback}
                      handleFeedback={handleFeedback}
                      feedbackMessage={feedbackMessage}
                      setFeedbackMessage={setFeedbackMessage}
                      hasFeedbackMessage={hasFeedbackMessage}
                      isSending={isSending}
                    />
                  )}
                </>
              ) : (
                <div
                  style={{
                    height: "18px",
                    width: "18px",
                    borderRadius: "100%",
                  }}
                  className="ping-animation tw-bg-black/50"
                ></div>
              )}
            </>
          )}
        </motion.section>
      </div>
    </>
  );
};

export default ChatBubble;
