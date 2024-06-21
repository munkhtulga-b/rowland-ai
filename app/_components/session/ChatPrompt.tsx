import { Input, Button } from "antd";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SessionChatPrompt = ({
  promptValue,
  setPromptValue,
  sendQuestion,
  isStreaming,
}: {
  promptValue: string;
  // eslint-disable-next-line no-unused-vars
  setPromptValue: (value: string) => void;
  sendQuestion: () => void | Promise<void>;
  isStreaming: boolean;
}) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-6 tw-pb-6 tw-bg-white tw-z-[999] tw-pt-4">
        <section className="tw-flex tw-justify-start tw-items-end tw-gap-2">
          <TextArea
            placeholder="Ask Rowland"
            autoSize={{ minRows: 1, maxRows: 6 }}
            style={{ flex: 1, fontSize: 18 }}
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !/\S/.test(promptValue)) {
                e.preventDefault();
              }
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !isStreaming &&
                /\S/.test(promptValue)
              ) {
                e.preventDefault();
                sendQuestion();
              }
              if (e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                setPromptValue(promptValue + "\n");
              }
            }}
          />
          <Button
            disabled={!/\S/.test(promptValue) || isStreaming}
            type="primary"
            style={{
              width: 67,
              height: 67,
              borderRadius: 8,
              backgroundColor: !promptValue?.length ? "#F4F5F6" : "",
            }}
            onClick={sendQuestion}
          >
            {!isStreaming ? (
              <Image
                src={"/assets/chat/send-icon.svg"}
                alt="send-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            ) : (
              <LoadingOutlined style={{ fontSize: 25, color: "#4FBA70" }} />
            )}
          </Button>
        </section>
        <section className="tw-flex tw-justify-center">
          <p className="tw-text-base tw-text-primaryGray tw-font-medium">
            Rowland is intended to guide and inform, not provide legal advice.
            Check important info.
          </p>
        </section>
      </div>
    </>
  );
};

export default SessionChatPrompt;
