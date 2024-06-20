import { TypeChat } from "@/app/_types/chat/TypeChat";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import dayjs from "dayjs";
import "katex/dist/katex.min.css";
import "katex/dist/katex.min.css";
import { preprocessLaTeX } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";
import { Readable } from "readable-stream";
import { toast } from "react-toastify";

const ChatBubble = ({
  chat,
  isStreaming,
  setIsStreaming,
}: {
  chat: TypeChat;
  isStreaming: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsStreaming: (value: boolean) => void;
}) => {
  const [streamMessage, setStreamMessage] = useState("");

  useEffect(() => {
    if (chat.question) {
      streamChat();
    }
  }, [chat]);

  const streamChat = async () => {
    if (!chat.question || isStreaming) return;

    setIsStreaming(true);
    const body = {
      question: chat.question,
      session_id: "bec51bba-5fd9-40a3-8be7-31c235a060ec",
    };

    const urlEncodedBody = new URLSearchParams(body).toString();
    const endpoint = process.env.NEXT_PUBLIC_BASE_API_URL;

    const resp = await fetch(`${endpoint}chat/stream`, {
      method: "POST",
      body: urlEncodedBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
            setStreamMessage(
              (prev) => prev + Buffer.from(value).toString("utf-8")
            );
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
          <span>{chat?.user === "USER" ? "You" : "Rowland"}</span>
          <span className="tw-text-xs tw-text-primaryGray tw-w-fit">
            {dayjs(chat?.created_at).format("DD MMM hh:mm A")}
          </span>
        </section>
        <section className="tw-p-4 tw-rounded-2xl tw-bg-grayLight tw-relative tw-transition-all tw-duration-100">
          <div
            className={`tw-absolute tw-top-[-22px] ${
              chat?.user === "USER" ? "tw-right-[-22px]" : "tw-left-[-22px]"
            } tw-bg-secondary tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center`}
          >
            <Image
              src={`/assets/chat/${
                chat?.user === "USER" ? "user-icon" : "rowland-ai-icon"
              }.svg`}
              alt="user-icon"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          {!chat.question ? (
            <p className="tw-text-base">{chat?.message}</p>
          ) : (
            <>
              {streamMessage.length ? (
                <Markdown
                  // eslint-disable-next-line react/no-children-prop
                  children={preprocessLaTeX(streamMessage)}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  className={"tw-text-base"}
                />
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
        </section>
      </div>
    </>
  );
};

export default ChatBubble;
