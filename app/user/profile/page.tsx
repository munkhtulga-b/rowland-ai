"use client";

import { useUserStore } from "@/app/_store/user-store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { Button } from "antd";
import TypeUser from "@/app/_types/auth/TypeUser";
import UserProfileForm from "@/app/_components/user/UserProfileForm";
import LogoutButton from "@/app/_components/user/LogoutButton";

const UserProfilePage = () => {
  const { user: userData } = useUserStore();
  const [user, setUser] = useState<TypeUser>({
    company_name: userData?.company_name || "",
    email: userData?.email || "",
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    id: userData?.id || "",
    is_email_verified: userData?.is_email_verified || false,
    is_subscribed_email: userData?.is_subscribed_email || false,
    role: userData?.role || "",
  });

  useEffect(() => {
    setUser({
      company_name: userData?.company_name || "",
      email: userData?.email || "",
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      id: userData?.id || "",
      is_email_verified: userData?.is_email_verified || false,
      is_subscribed_email: userData?.is_subscribed_email || false,
      role: userData?.role || "",
    })
  }, [])


  return <>
    <>
      <div className="tw-flex tw-flex-col tw-gap-8" style={{
        width: '500px'
      }}>
        <div className="tw-p-6 tw-rounded-2xl tw-bg-grayLight tw-flex tw-gap-4">
          <div
            className="tw-bg-secondary tw-text-white tw-rounded-full tw-min-w-[50px] tw-max-w-[50px] tw-min-h-[50px] tw-max-h-[50px] tw-grid tw-place-items-center tw-overflow-clip"
          >
            <Image
              src={"/assets/navbar/user-icon-white.svg"}
              alt="user-icon"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div>
            <div className="tw-text-xl tw-font-semibold">
              {user?.first_name}
            </div>
            <div className="tw-text-md tw-text-primaryGray">
              {user?.email}
            </div>
          </div>
        </div>

        <div className="tw-p-6 tw-rounded-2xl tw-bg-grayLight">
          <UserProfileForm user={user} />
        </div>

        <div className="tw-p-6 tw-rounded-2xl tw-bg-grayLight hover:tw-bg-slate-200">
          <LogoutButton />
        </div>
      </div>
    </>
  </>;
};

export default UserProfilePage;