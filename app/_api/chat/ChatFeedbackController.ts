import {
  TypeChatFeedbackRequest,
  TypeChatFeedbackResponse,
} from "@/app/_types/chat/TypeChatFeedback";
import fetchData from "../config";

export const send = async (body: TypeChatFeedbackRequest) => {
  return fetchData<TypeChatFeedbackResponse, TypeChatFeedbackRequest>(
    "chat/send-feedback",
    "POST",
    body
  );
};
