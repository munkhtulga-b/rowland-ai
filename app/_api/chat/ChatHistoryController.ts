import fetchData from "../config";

export const getMany = async () => {
  return fetchData<any, null>("chat/history", "GET");
};
