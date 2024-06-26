"use client";

import { LeftOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const ProfileNavBar = ({ height }: { height: number }) => {
  const [user, setUser] = useState("");
  const router = useRouter()

  useEffect(() => {
    setUser(Cookies.get("user") ?? "");
    console.log(user)
  }, []);

  return (
    <>
      <nav
        style={{ height: height }}
        className="tw-bg-secondary tw-flex tw-justify-between tw-items-center tw-px-6 md:tw-px-10 tw-w-full"
      >
        <div className="tw-text-white tw-text-2xl hover:tw-cursor-pointer" onClick={() => router.back()}>
          <LeftOutlined />
          <span className="">User Profile</span>
        </div>

        {/* <div
          onClick={() => Cookies.remove("session")}
          className="tw-bg-white tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center tw-overflow-clip"
        >
          <>
            HELLO
          </>
        </div> */}
      </nav>
    </>
  );
};

export default ProfileNavBar;
