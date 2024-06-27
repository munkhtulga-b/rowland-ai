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
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
import ChatFeedback from "./ChatFeedback";

type NotificationPlacement = NotificationArgsProps["placement"];

const HistoryChatBubble = ({ chat }: { chat: TypeHistoryChat }) => {
  const [api, _contextHolder] = notification.useNotification();
  const [sentFeedback, setSentFeedback] = useState<
    _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE | null
  >(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [hasFeedbackMessage, setHasFeedbackMessage] = useState<boolean>(
    chat.Answer.feedback && chat.Answer.feedback.message ? true : false
  );

  useEffect(() => {
    if (chat.Answer.feedback && chat.Answer.feedback.rate !== null) {
      setSentFeedback(chat.Answer.feedback.rate);
    }
  }, [chat]);

  const handleFeedback = async (rating: number, message?: string) => {
    if (rating === _EEnumChatFeedback._LIKE) {
      const { isOk } = await $api.user.feedback.send({
        answer_id: chat.Answer.id,
        rate: rating,
      });
      if (isOk) {
        setSentFeedback(rating);
        openNotification("bottom");
        setHasFeedbackMessage(false);
      }
    } else {
      setIsSending(true);
      const { isOk } = await $api.user.feedback.send({
        answer_id: chat.Answer.id,
        rate: rating,
        message: message,
      });
      if (isOk) {
        openNotification("bottom");
        setHasFeedbackMessage(true);
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

  return (
    <>
      {_contextHolder}
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
            <ChatFeedback
              answerId={chat.Answer.id}
              sentFeedback={sentFeedback}
              setSentFeedback={setSentFeedback}
              handleFeedback={handleFeedback}
              feedbackMessage={feedbackMessage}
              setFeedbackMessage={setFeedbackMessage}
              hasFeedbackMessage={hasFeedbackMessage}
              isSending={isSending}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default HistoryChatBubble;
