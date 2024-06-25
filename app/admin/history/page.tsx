"use client";

import { DownloadOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { Flex, Layout, DatePicker, Space, Button } from 'antd';
import type { DatePickerProps } from 'antd';
import { useState } from "react";
import dayjs from "dayjs";
import { useUserStore } from '@/app/_store/user-store';
import $api from "@/app/_api";
import Cookies from "js-cookie";

interface FilterDate {
  startDate: string,
  endDate: string,
}

const ExportCSVPage = () => {
  const [date, setDate] = useState<FilterDate>({
    startDate: dayjs(new Date).format('YYYY-MM-DD').toString(),
    endDate: dayjs(new Date).format('YYYY-MM-DD').toString(),
  });
  const router = useRouter();

  const getUser = useUserStore(state => state.getUser())

  const onChangeStartDate: DatePickerProps['onChange'] = (date) => {
    const d = dayjs(date).format('YYYY-MM-DD').toString()
    setDate((prevState) => ({
      ...prevState,
      startDate: d
    }))
  };

  const onChangeEndDate: DatePickerProps['onChange'] = (date) => {
    const d = dayjs(date).format('YYYY-MM-DD').toString()
    setDate((prevState) => ({
      ...prevState,
      endDate: d
    }))
  };

  const onExport = async () => {
    const params = {
      startDate: date.startDate,
      endDate: date.endDate,
    };

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const accessToken = Cookies.get("token");
    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

    // const { isOk, data } = await $api.admin.exportCSV(params);

    const resp = await fetch(`http://localhost:4000/v1/chat/download-csv?startDate=${params.startDate}&endDate=${params.endDate}`, {
      method: 'GET',
      headers: requestHeaders
    });

    if (!resp.ok) {
      console.error("Failed to download CSV file");
      return;
    }

    const blob = await resp.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_history_${ params.startDate }_to_${ params.endDate }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="tw-bg-white tw-rounded-[26px] tw-p-10 tw-w-full tw-flex tw-flex-col tw-gap-8 tw-h-full">
        <h1 className="tw-text-lg tw-font-semibold">Detailed interaction log (History) (CSV)</h1>
        <Flex>
          <Space direction="horizontal" size={12}>
            <DatePicker value={dayjs(date?.startDate)} onChange={onChangeStartDate} />
            <DatePicker value={dayjs(date?.endDate)} onChange={onChangeEndDate} />
            <Button
              style={{
                height: '0',
                fontSize: '14px',
                borderRadius: '6px'
              }}
              type="primary"
              icon={<DownloadOutlined />}
              onClick={onExport}
            >
              Export
            </Button>
          </Space>
        </Flex>
      </div>
    </Layout>
  );
};

export default ExportCSVPage;
