"use client";

import $api from "@/app/_api";
import {
  TypeHistoryItem,
  TypeSortedHistoryItem,
} from "@/app/_types/chat/TypeHistoryItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { useNewSessionStore } from "@/app/_store/new-session-store";

dayjs.extend(utc);

const SessionSideBar = () => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<TypeHistoryItem[]>([]);
  const [groupedHistory, setGroupedHistory] = useState<TypeSortedHistoryItem[]>(
    []
  );

  const getNewSession = useNewSessionStore((state) => state.getSession());

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (getNewSession?.history) {
      const shallow = [...history];
      shallow.push(getNewSession.history);
      setHistory(shallow);
      sortHistory(shallow);
    }
  }, [getNewSession]);

  const fetchHistory = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.user.chat.getMany({
      sortBy: "created_at",
      sortType: "desc",
    });
    if (isOk) {
      setHistory(data);
      sortHistory(data);
    }
    setIsLoading(false);
  };

  const sortHistory = (data: TypeHistoryItem[]) => {
    const result: TypeSortedHistoryItem[] = [];
    const sortedData: TypeHistoryItem[] = [];
    data.forEach((item) => {
      const currentDate = dayjs();
      if (dayjs.utc(item.created_at).isSame(currentDate, "day")) {
        sortedData.push({
          ...item,
          label: "Today",
        });
      } else if (
        dayjs.utc(item.created_at).isSame(currentDate.subtract(1, "day"), "day")
      ) {
        sortedData.push({
          ...item,
          label: "Yesterday",
        });
      } else if (
        dayjs.utc(item.created_at).isAfter(dayjs().startOf("month")) &&
        dayjs
          .utc(item.created_at)
          .isBefore(dayjs().endOf("month").subtract(2, "day"))
      ) {
        sortedData.push({
          ...item,
          label: "This month",
        });
      } else if (
        dayjs.utc(item.created_at).isAfter(dayjs().startOf("year")) &&
        dayjs
          .utc(item.created_at)
          .isBefore(dayjs().endOf("year").subtract(2, "day"))
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
        items: _.sortBy(grouped[key], "created_at"),
      });
    });
    setGroupedHistory(result);
  };

  return (
    <>
      <div className="tw-bg-grayLight tw-rounded-[26px] tw-pl-10 tw-py-10 tw-w-full tw-h-full tw-relative">
        {!isLoading ? (
          <>
            {groupedHistory.length ? (
              <>
                <ul className="tw-h-full tw-flex tw-flex-col tw-gap-4 tw-pr-10 tw-overflow-y-auto tw-overflow-x-clip tw-pb-[60px]">
                  {groupedHistory.map((group) => (
                    <li
                      key={group.title}
                      className="tw-flex tw-flex-col tw-gap-2 tw-m-0"
                    >
                      <span className="tw-font-medium">{group.title}</span>
                      <ul className="tw-flex tw-flex-col tw-gap-2 tw-mr-[-8px]">
                        {group.items.map((item) => (
                          <li
                            key={item.id}
                            className={`${
                              params?.id === item.session_id
                                ? "tw-bg-grayMedium"
                                : ""
                            } tw-m-0 tw-p-2 tw-rounded tw-cursor-pointer tw-truncate`}
                            onClick={() =>
                              router.push(`/chat/${item.session_id}`)
                            }
                          >
                            <span className="tw-text-primaryGray tw-font-medium">
                              {item.summary}
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
        ) : null}
        <div
          className="tw-bg-grayLight tw-absolute tw-left-6 tw-right-6 tw-bottom-10 tw-p-2 tw-rounded-lg tw-cursor-pointer hover:tw-bg-grayMedium tw-transition-all tw-duration-200"
          onClick={() => router.push("/")}
        >
          <section className="tw-flex tw-justify-start tw-items-center tw-gap-3">
            <Image
              src="/assets/chat/new-chat-icon.svg"
              alt="new-chat"
              width={0}
              height={0}
              style={{ height: "auto", width: "auto" }}
            />
            <span className="tw-text-primaryGray tw-text-lg">New session</span>
          </section>
        </div>
      </div>
    </>
  );
};

export default SessionSideBar;
