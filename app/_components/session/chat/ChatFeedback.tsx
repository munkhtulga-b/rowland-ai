import _EEnumChatFeedback from "@/app/_enums/EEnumChatFeedback";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const ChatFeedback = ({
  handleFeedback,
  sentFeedback,
  setSentFeedback,
  feedbackMessage,
  setFeedbackMessage,
  isSending,
}: {
  sentFeedback: _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE | null;
  setSentFeedback: (
    _feedback: _EEnumChatFeedback._LIKE | _EEnumChatFeedback._DISLIKE
  ) => void;
  handleFeedback: (_rating: number, _message?: string) => Promise<void>;
  feedbackMessage: string;
  setFeedbackMessage: (_message: string) => void;
  isSending: boolean;
}) => {
  return (
    <>
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
              onClick={() => setSentFeedback(_EEnumChatFeedback._DISLIKE)}
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
      {sentFeedback === _EEnumChatFeedback._DISLIKE && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <span className="tw-text-base tw-font-medium">Give us feedback:</span>
          <div className="tw-flex tw-justify-start tw-items-end tw-gap-3">
            <Input
              size="small"
              placeholder="Write your feeback here..."
              style={{ flex: 1, backgroundColor: "#FFF" }}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              disabled={isSending}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !isSending &&
                  /\S/.test(feedbackMessage)
                ) {
                  handleFeedback(sentFeedback, feedbackMessage);
                }
              }}
            />
            <Button
              disabled={!/\S/.test(feedbackMessage) || isSending}
              type="primary"
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                backgroundColor: "#FFF",
              }}
              onClick={() => handleFeedback(sentFeedback, feedbackMessage)}
            >
              {!isSending ? (
                <Image
                  src={"/assets/chat/send-icon-green.svg"}
                  alt="send-icon"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <LoadingOutlined style={{ fontSize: 25, color: "#4FBA70" }} />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatFeedback;
