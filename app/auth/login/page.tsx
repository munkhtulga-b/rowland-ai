"use client";

import LoginForm from "@/app/_components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { generateUUID } from "@/app/_utils/helpers";
import $api from "@/app/_api";
import { TypeLoginRequest } from "@/app/_types/auth/TypeLoginBody";
import { useUserStore } from "@/app/_store/user-store";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const onLogin = async (params: TypeLoginRequest) => {
    setIsLoading(true);
    const { isOk, data } = await $api.auth.login(params);
    if (isOk) {
      setUser(data.user);
      Cookies.set("session", "true");
      if (process.env.NODE_ENV === "development") {
        Cookies.set("token", data.tokens.access.token, {
          expires: new Date(data.tokens.access.expires),
        });
      }
      router.push(`/chat/${generateUUID()}`);
    } else {
      toast.error("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-8">
        <section className="tw-flex tw-justify-center">
          <span className="tw-text-3xl tw-font-medium">Log in</span>
        </section>
        <section>
          <LoginForm onLogin={onLogin} isLoading={isLoading} />
        </section>
        <section className="tw-flex tw-justify-center tw-gap-2">
          <span className="tw-text-base">Create a new account</span>
          <span
            onClick={() => router.push("/auth/sign-up")}
            className="tw-text-base tw-text-primaryGreen tw-underline tw-underline-offset-4 tw-cursor-pointer"
          >
            Sign up
          </span>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
