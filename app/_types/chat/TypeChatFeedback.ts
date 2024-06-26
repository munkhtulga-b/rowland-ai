export type TypeChatFeedbackRequest = {
  answer_id: number;
  message?: string;
  rate: number;
};

export type TypeChatFeedbackResponse = {
  message: string;
};
