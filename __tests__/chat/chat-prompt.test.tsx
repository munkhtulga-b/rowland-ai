import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import SessionChatPrompt from "../../app/_components/session/ChatPrompt";

describe("Chat prompt tests", () => {
  it("renders chat text field", () => {
    render(
      <SessionChatPrompt
        promptValue=""
        setPromptValue={() => {}}
        sendQuestion={() => {}}
        isSending={false}
      />
    );
    const textareaElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");
    expect(textareaElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });
});
