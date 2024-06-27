"use client";

import { DownloadOutlined } from '@ant-design/icons';
import { Flex, Layout, DatePicker, Space, Button } from 'antd';
import type { DatePickerProps } from 'antd';
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Cookies from "js-cookie";
import { start } from 'repl';

dayjs.extend(customParseFormat)

const ExportCSVPage = () => {
  const [startDate, setStartDate] = useState<Dayjs>()
  const [endDate, setEndDate] = useState<Dayjs>();
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  
  useEffect(() => {
    if (startDate && endDate){
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [startDate, endDate])


  const onChangeStartDate: DatePickerProps['onChange'] = (date) => {
    setStartDate(date)
  };

  const onChangeEndDate: DatePickerProps['onChange'] = (date) => {
    setEndDate(date)
  };

  const onExport = async () => {
    const params = {
      startDate: dayjs(startDate).format('YYYY-MM-DD').toString(),
      endDate: dayjs(endDate).format('YYYY-MM-DD').toString(),
    };

    const urlSearchParams = new URLSearchParams(params).toString();
    const endpoint = process.env.NEXT_PUBLIC_BASE_API_URL;

    // eslint-disable-next-line no-undef
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const accessToken = Cookies.get("token");

    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

    const resp = await fetch(`${endpoint}chat/download-csv?${urlSearchParams}`, {
      method: 'GET',
      headers: requestHeaders,
      credentials: process.env.NODE_ENV === "development" ? "omit" : "include",
    });

    if (!resp.ok) {
      console.error("Failed to download CSV file");
      return;
    }

    const blob = await resp.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_history_${params.startDate}_to_${params.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="tw-bg-white tw-rounded-[26px] tw-p-10 tw-w-full tw-flex tw-flex-col tw-gap-8 tw-h-full">
        <h1 className="tw-text-lg tw-font-semibold">Detailed interaction log (CSV)</h1>
        <Flex>
          <Space direction="horizontal" size={12}>
            <DatePicker 
              placeholder='Start date' 
              value={startDate}  
              onChange={onChangeStartDate} 
            />
            <DatePicker 
              placeholder='End date' 
              value={endDate} 
              onChange={onChangeEndDate} 
              // disabledDate={(startDate) => {
              //   return dayjs().isBefore(dayjs('2024-06-11'))
              // }} 
              disabled={!startDate}
              minDate={startDate}
            />
            <Button
              style={{
                height: '0',
                fontSize: '14px',
                borderRadius: '6px'
              }}
              type="primary"
              icon={<DownloadOutlined />}
              onClick={onExport}
              disabled={isBtnDisabled}
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
