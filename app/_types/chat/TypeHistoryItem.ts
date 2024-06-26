export type TypeHistoryItem = {
  id: number;
  label?: string;
  user_id: string;
  session_id: string;
  summary: string | null;
  created_at: string;
  updated_at: string;
};

export type TypeSortedHistoryItem = {
  title: string;
  items: TypeHistoryItem[];
};
