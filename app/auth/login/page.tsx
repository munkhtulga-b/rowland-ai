"use client";

import LoginForm from "@/app/_components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import $api from "@/app/_api";
import { TypeLoginRequest } from "@/app/_types/auth/TypeLoginBody";
import { useUserStore } from "@/app/_store/user-store";
import _EEnumUserTypes from "@/app/_enums/EEnumUserTypes";
import { notification } from "antd";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [api, _contextHolder] = notification.useNotification();
  const openNotification = (message: string) => {
    api.error({
      message,
      style: {
        marginBottom: 0,
      },
    });
  };
  const setUser = useUserStore((state) => state.setUser);

  const onLogin = async (params: TypeLoginRequest) => {
    setIsLoading(true);
    const { isOk, data } = await $api.auth.login(params);
    if (isOk) {
      setUser(data.user);
      Cookies.set("session", "true");
      Cookies.set(
        "x-user-type",
        data.user.role === "USER"
          ? _EEnumUserTypes._USER
          : _EEnumUserTypes._ADMIN
      );
      if (process.env.NODE_ENV === "development") {
        const currentDate = new Date();
        const expire_date1= new Date(data.tokens.access.expires);
        const expire_date2= new Date(data.tokens.refresh.expires);
        const diff1 = expire_date1.getTime() - currentDate.getTime();
        const diff2 = expire_date2.getTime() - currentDate.getTime();
        const access_expire = diff1 / ( 1000 * 60 * 60 * 24);
        const refresh_expire = diff2 / ( 1000 * 60 * 60 * 24);

        Cookies.set("token", data.tokens.access.token, {
          expires: access_expire
        });
        Cookies.set("rtoken", data.tokens.refresh.token, {
          expires: refresh_expire
        });
      }
      router.push(data.user.role === "USER" ? "/chat" : "/admin/history");
    } else {
      openNotification(data.error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {_contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-8">
        <section className="tw-flex tw-justify-center">
          <span className="tw-text-3xl tw-font-medium">Log in</span>
        </section>
        <section>
          <LoginForm onLogin={onLogin} isLoading={isLoading} />
        </section>
        <section className="tw-flex tw-justify-center tw-gap-2">
          <span className="tw-text-base">Don{"'"}t have an account?</span>
          <span
            onClick={() => router.push("/auth/sign-up")}
            className="tw-text-base tw-text-primaryGreen tw-underline tw-underline-offset-4 tw-cursor-pointer"
          >
            Sign up here!
          </span>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
