"use client";

import $api from "@/app/_api";
import {
  TypeHistoryItem,
  TypeSortedHistoryItem,
} from "@/app/_types/chat/TypeHistoryItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { useRouter } from "next/navigation";

const SessionSideBar = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<TypeSortedHistoryItem[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.user.chat.getMany({
      sortBy: "created_at",
    });
    if (isOk) {
      sortHistory(data);
    }
    setIsLoading(false);
  };

  const sortHistory = (data: TypeHistoryItem[]) => {
    const result: TypeSortedHistoryItem[] = [];
    const sortedData: TypeHistoryItem[] = [];
    data.forEach((item) => {
      const currentDate = dayjs();
      if (dayjs(item.created_at).isSame(currentDate, "day")) {
        sortedData.push({
          ...item,
          label: "Today",
        });
      } else if (
        dayjs(item.created_at).isSame(currentDate.subtract(1, "day"), "day")
      ) {
        sortedData.push({
          ...item,
          label: "Yesterday",
        });
      } else if (
        dayjs(item.created_at).isAfter(dayjs().startOf("month")) &&
        dayjs(item.created_at).isBefore(
          dayjs().endOf("month").subtract(2, "day")
        )
      ) {
        sortedData.push({
          ...item,
          label: "This month",
        });
      } else if (
        dayjs(item.created_at).isAfter(dayjs().startOf("year")) &&
        dayjs(item.created_at).isBefore(
          dayjs().endOf("year").subtract(2, "day")
        )
      ) {
        sortedData.push({
          ...item,
          label: dayjs(item.created_at).format("MMMM"),
        });
      }
    });
    const grouped = _.groupBy(sortedData, "label");
    Object.keys(grouped).forEach((key) => {
      result.push({
        title: key,
        items: grouped[key],
      });
    });
    setHistory(result);
  };

  return (
    <>
      <div className="tw-bg-grayLight tw-rounded-[26px] tw-p-10 tw-w-full tw-h-full">
        {!isLoading ? (
          <>
            {history.length ? (
              <>
                <ul className="tw-flex tw-flex-col tw-gap-4">
                  {history.map((group) => (
                    <li
                      key={group.title}
                      className="tw-flex tw-flex-col tw-gap-2 tw-m-0"
                    >
                      <span className="tw-font-medium">{group.title}</span>
                      <ul className="tw-flex tw-flex-col tw-gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item.id}
                            className="tw-m-0 tw-cursor-pointer"
                            onClick={() => router.push(`/chat/${item.id}`)}
                          >
                            <span className="tw-text-primaryGray tw-font-medium tw-truncate">
                              {item.id}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
};

export default SessionSideBar;
