import { Input, Button } from "antd";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SessionChatPrompt = ({
  promptValue,
  setPromptValue,
  sendQuestion,
  isSending,
}: {
  promptValue: string;
  // eslint-disable-next-line no-unused-vars
  setPromptValue: (value: string) => void;
  sendQuestion: () => void;
  isSending: boolean;
}) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-6 tw-pb-6 tw-bg-white tw-z-[999]">
        <section className="tw-flex tw-justify-start tw-items-end tw-gap-2">
          <TextArea
            placeholder="Ask questions, or type ‘/’ for commands"
            autoSize={{ minRows: 1, maxRows: 6 }}
            style={{ flex: 1, fontSize: 18 }}
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            disabled={isSending}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSending) {
                e.preventDefault();
                sendQuestion();
              }
            }}
          />
          <Button
            disabled={!promptValue?.length}
            type="primary"
            style={{
              width: 67,
              height: 67,
              borderRadius: 8,
              backgroundColor: !promptValue?.length ? "#F4F5F6" : "",
            }}
            onClick={sendQuestion}
          >
            {!isSending ? (
              <Image
                src={"/assets/chat/send-icon.svg"}
                alt="send-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            ) : (
              <LoadingOutlined style={{ fontSize: 25, color: "#fff" }} />
            )}
          </Button>
        </section>
        <section className="tw-flex tw-justify-center">
          <p className="tw-text-base tw-text-primaryGray tw-font-medium">
            Rowland AI can make mistakes sometimes. Please check the
            instructions for prompting.
          </p>
        </section>
      </div>
    </>
  );
};

export default SessionChatPrompt;
