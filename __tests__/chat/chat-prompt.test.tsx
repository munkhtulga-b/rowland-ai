import { render, screen, renderHook } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import SessionChatPrompt from "../../app/_components/session/ChatPrompt";
import { useWindowWidth } from "@/app/_utils/custom-hooks";

describe("Chat prompt tests", () => {
  it("renders chat text field", () => {
    render(
      <SessionChatPrompt
        promptValue=""
        setPromptValue={() => {}}
        sendQuestion={() => {}}
        isStreaming={false}
      />
    );
    const { result } = renderHook(() => useWindowWidth());
    const textareaElement = screen.getByPlaceholderText("Ask Rowland"); // Assuming your textarea has this placeholder
    const buttonElement = screen.getByRole("button");
    expect(result.current).toBeTypeOf("number");
    expect(textareaElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });
});
