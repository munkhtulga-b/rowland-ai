import TypeHistoryItem from "@/app/_types/chat/TypeHistoryItem";
import fetchData from "../config";

export const getMany = async () => {
  return fetchData<TypeHistoryItem[], null>("chat/history", "GET");
};
