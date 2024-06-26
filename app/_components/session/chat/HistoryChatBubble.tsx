import "katex/dist/katex.min.css";
import "./markdown.css";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { preprocessLaTeX } from "@/app/_utils/helpers";
import Image from "next/image";
import dayjs from "dayjs";
import { TypeHistoryChat } from "@/app/_types/chat/TypeChat";
import $api from "@/app/_api";
import _EEnumChatFeedback from "@/app/_enums/EEnumChatFeedback";
import { useEffect, useState } from "react";

const HistoryChatBubble = ({ chat }: { chat: TypeHistoryChat }) => {
  const [sentFeedback, setSentFeedback] = useState<
    _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE | null
  >(null);

  useEffect(() => {
    if (chat.Answer.feedback && chat.Answer.feedback.rate !== null) {
      setSentFeedback(chat.Answer.feedback.rate);
    }
  }, [chat]);

  const handleFeedback = async (rating: number) => {
    if (sentFeedback !== null) return;
    const { isOk } = await $api.user.feedback.send({
      answer_id: chat.Answer.id,
      rate: rating,
    });
    if (isOk) {
      setSentFeedback(rating);
    }
  };

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
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-10">
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
                    onClick={() => handleFeedback(_EEnumChatFeedback._LIKE)}
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
                    onClick={() => handleFeedback(_EEnumChatFeedback._DISLIKE)}
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
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HistoryChatBubble;
