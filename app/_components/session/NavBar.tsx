"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import _EEnumUserTypes from "@/app/_enums/EEnumUserTypes";
import { useUserStore } from "@/app/_store/user-store";

const SessionNavBar = ({ height }: { height: number }) => {
  const [user, setUser] = useState("");
  const { user: userr } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    setUser(Cookies.get("user") ?? "");
  }, []);

  const onProfile = () => {
    if (userr?.role == "ADMIN") {
      router.push('/admin/profile')
    } else {
      router.push('/user/profile')
    }
  }

  return (
    <>
      <nav
        style={{ height: height }}
        className="tw-bg-secondary tw-flex tw-justify-between tw-items-center tw-px-6 md:tw-px-10 tw-w-full"
      >
        <Image
          src={"/logo-no-slogan.svg"}
          alt="logo"
          width={0}
          height={0}
          style={{ height: "auto", width: "auto" }}
          unoptimized
          priority
        />
        <div
          onClick={onProfile}
          className="tw-bg-white tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center tw-overflow-clip hover:tw-cursor-pointer"
        >
          <>
            {user === "jjohnson@futureprooftech.com" ? (
              <Image
                src="/assets/chat/jerris.jfif"
                alt="user-icon"
                width={44}
                height={44}
                unoptimized
                priority
              />
            ) : (
              <Image
                src={"/assets/navbar/user-icon-black.svg"}
                alt="user-icon"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </>
        </div>
      </nav>
    </>
  );
};

export default SessionNavBar;
