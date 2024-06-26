import { TypeHistoryItem } from "@/app/_types/chat/TypeHistoryItem";
import fetchData from "../config";
import { createQueryString } from "@/app/_utils/helpers";
import TypePaginationQuery from "@/app/_types/query/TypePaginationQuery";
import { TypeHistoryChat } from "@/app/_types/chat/TypeChat";

export const getMany = async (queries?: TypePaginationQuery | undefined) => {
  const queryString = createQueryString<TypePaginationQuery>(queries);
  return fetchData<TypeHistoryItem[], null>(
    `chat/history${queryString}`,
    "GET"
  );
};

export const getOne = async (
  id: string | number,
  queries?: TypePaginationQuery | undefined
) => {
  const queryString = createQueryString<TypePaginationQuery>(queries);
  return fetchData<TypeHistoryChat[], null>(
    `chat/history/${id}${queryString}`,
    "GET"
  );
};
