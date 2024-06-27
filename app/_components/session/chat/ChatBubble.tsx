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
import { motion, AnimatePresence } from "framer-motion";
import { TypePromtChat } from "@/app/_types/chat/TypeChat";
import _EEnumChatFeedback from "@/app/_enums/EEnumChatFeedback";
import $api from "@/app/_api";

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
  const [streamMessage, setStreamMessage] = useState("");
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [sentFeedback, setSentFeedback] = useState<
    _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE | null
  >(null);

  useEffect(() => {
    console.log(answerId);
  }, [answerId]);

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

  const handleFeedback = async (rating: number) => {
    if (!answerId || sentFeedback !== null) return;
    const { isOk } = await $api.user.feedback.send({
      answer_id: answerId,
      rate: rating,
    });
    if (isOk) {
      setSentFeedback(rating);
    }
  };

  const streamChat = async () => {
    if (!chat.question || isStreaming) return;

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
      const stream = new Readable({
        async read() {
          const { done, value } = await reader.read();
          if (done) {
            scrollToBottom();
            this.push(null);
            setIsStreaming(false);
          } else {
            this.push(Buffer.from(value));
            const stringValue = Buffer.from(value).toString("utf-8");
            if (stringValue.match(/%%([^%]+)%%/g)) {
              setAnswerId(Number(stringValue.replace(/%/g, "")));
            } else {
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
                  <AnimatePresence>
                    {!isStreaming && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="tw-flex tw-justify-between tw-items-center tw-gap-10"
                        >
                          <section className="tw-px-[10px] tw-py-2 tw-rounded-lg tw-bg-white tw-flex tw-justify-start tw-items-center tw-gap-3">
                            <span className="tw-text-primaryGray">
                              Is this conversation helpful so far?
                            </span>
                            <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                              <Image
                                src={`/assets/chat/thumb-up-${
                                  sentFeedback === _EEnumChatFeedback._LIKE
                                    ? "filled"
                                    : "outlined"
                                }.svg`}
                                alt="thumbs-up"
                                width={0}
                                height={0}
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleFeedback(_EEnumChatFeedback._LIKE)
                                }
                              />
                              <Image
                                src={`/assets/chat/thumb-down-${
                                  sentFeedback === _EEnumChatFeedback._DISLIKE
                                    ? "filled"
                                    : "outlined"
                                }.svg`}
                                alt="thumbs-down"
                                width={0}
                                height={0}
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleFeedback(_EEnumChatFeedback._DISLIKE)
                                }
                              />
                            </div>
                          </section>
                          <section className="tw-px-[10px] tw-py-2 tw-rounded-lg tw-bg-white tw-flex tw-justify-start tw-items-center tw-gap-2 tw-cursor-pointer">
                            <span>Source</span>
                            <Image
                              src="/assets/chat/arrow-right.svg"
                              alt="source"
                              width={0}
                              height={0}
                              style={{ width: "auto", height: "auto" }}
                            />
                          </section>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
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
