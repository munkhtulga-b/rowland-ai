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

export type TypeChat = {
  id: string | number;
  message: string;
  user: string;
  created_at: string;
};
