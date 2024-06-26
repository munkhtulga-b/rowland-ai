import "katex/dist/katex.min.css";
import "./markdown.css";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { preprocessLaTeX } from "@/app/_utils/helpers";
import Image from "next/image";
import dayjs from "dayjs";
import { TypeHistoryChat } from "@/app/_types/chat/TypeChat";

const HistoryChatBubble = ({ chat }: { chat: TypeHistoryChat }) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-[30px]">
        <div
          className={`tw-w-fit tw-self-end tw-flex tw-flex-col tw-justify-end`}
        >
          <section
            className={`tw-flex tw-justify-end tw-mr-6 tw-items-end tw-gap-2`}
          >
            <span>You</span>
            <span className="tw-text-xs tw-text-primaryGray tw-w-fit">
              {dayjs(chat?.created_at).format("DD MMM hh:mm A")}
            </span>
          </section>
          <section className="tw-flex tw-flex-col tw-gap-y-4 tw-p-4 tw-rounded-2xl tw-bg-grayLight tw-relative tw-transition-all tw-duration-100">
            <div
              className={`tw-absolute tw-top-[-22px] tw-right-[-22px] tw-bg-secondary tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center tw-overflow-clip`}
            >
              <Image
                src={`/assets/chat/user-icon.svg`}
                alt="user-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className="tw-text-base">{chat.Question.message}</p>
          </section>
        </div>
        <div
          className={`tw-w-fit tw-self-start tw-flex tw-flex-col tw-justify-end`}
        >
          <section
            className={`tw-flex tw-justify-start tw-ml-6 tw-items-end tw-gap-2`}
          >
            <span>Rowland</span>
            <span className="tw-text-xs tw-text-primaryGray tw-w-fit">
              {dayjs(chat?.created_at).format("DD MMM hh:mm A")}
            </span>
          </section>
          <section className="tw-flex tw-flex-col tw-gap-y-4 tw-p-4 tw-rounded-2xl tw-bg-grayLight tw-relative tw-transition-all tw-duration-100">
            <div
              className={`tw-absolute tw-top-[-22px] tw-left-[-22px] tw-bg-secondary tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center tw-overflow-clip`}
            >
              <Image
                src={`/assets/chat/rowland-ai-icon.svg`}
                alt="user-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <Markdown
              // eslint-disable-next-line react/no-children-prop
              children={preprocessLaTeX(chat.Answer.message)}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              className={"tw-text-base"}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default HistoryChatBubble;
