export type TypeChatbotResponse = {
  data: {
    info: {
      chunkIds: string[];
      model: string;
      response_time: number;
      sources: Array<{
        page_numbers: number[];
        source_name: string;
        time_stamps: number[];
      }>;
      total_tokens: number;
    };
    message: string;
    session_id: string;
    user: string;
  };
  status: string;
};

export type TypePromtChat = {
  id: string | number;
  question?: string;
  message: string;
  user: string;
  created_at: string;
};

export type TypeHistoryChat = {
  id: number;
  chat_history_id: number;
  created_at: string;
  Question: {
    id: number;
    message: string;
    chat_id: number;
  };
  Answer: {
    id: number;
    message: string;
    response_time: number;
    total_tokens: number;
    model: string;
    sources: string[];
    chat_id: number;
    feedback: {
      answer_id: number;
      id: number;
      message: string | null;
      rate: number;
    } | null;
  };
};
