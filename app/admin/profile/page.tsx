"use client";

import { useUserStore } from "@/app/_store/user-store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TypeUser from "@/app/_types/auth/TypeUser";
import LogoutButton from "@/app/_components/user/LogoutButton";
import ChangePasswordButton from "@/app/_components/user/ChangePasswordButton";

const AdminProfilePage = () => {
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
    <div className="tw-flex tw-flex-col tw-gap-8" style={{
      width: '500px'
    }}>
      <div className="tw-p-6 tw-rounded-2xl tw-bg-grayLight tw-flex tw-gap-4 tw-items-center">
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
        <div className="tw-text-2xl tw-text-black tw-font-medium">
          {user?.email}
        </div>
      </div>

      <div className="">
        <ChangePasswordButton />
      </div>

      <div className="">
        <LogoutButton />
      </div>
    </div>
  </>;
};

export default AdminProfilePage;