import { TypeChat } from "@/app/_types/chat/TypeChat";
import { useTypewriter } from "@/app/_utils/custom-hooks";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import dayjs from "dayjs";
import "katex/dist/katex.min.css";
import "katex/dist/katex.min.css";
import { preprocessLaTeX } from "@/app/_utils/helpers";

const ChatBubble = ({ chat }: { chat: TypeChat }) => {
  const generatedText = useTypewriter(preprocessLaTeX(chat?.message));

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
        <section className="tw-p-4 tw-rounded-2xl tw-bg-grayLight tw-relative">
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
          {chat?.user === "USER" ? (
            <p className="tw-text-base">{chat?.message}</p>
          ) : (
            <Markdown
              // eslint-disable-next-line react/no-children-prop
              children={generatedText}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              className={"tw-text-base"}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default ChatBubble;
