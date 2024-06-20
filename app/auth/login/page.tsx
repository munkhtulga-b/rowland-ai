"use client";

import LoginForm from "@/app/_components/auth/LoginForm";
import TypeLoginAccount from "@/app/_types/auth/TypeLoginAccout";
import TypeLoginField from "@/app/_types/auth/TypeLoginField";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { generateUUID } from "@/app/_utils/helpers";

const accounts: TypeLoginAccount[] = [
  {
    id: 1,
    email: "munkhtulga@mirai.mn",
    password: "Mirai@12345",
  },
  {
    id: 2,
    email: "testuser@mirai.mn",
    password: "Mirai!12345",
  },
  {
    id: 3,
    email: "demo@rowland.ai",
    password: "demo@1234",
  },
  {
    id: 4,
    email: "jjohnson@futureprooftech.com",
    password: "demo@1234",
  },
];

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (params: TypeLoginField) => {
    setIsLoading(true);
    const matched = _.find(accounts, (account) => {
      return (
        account.email === params.email && account.password === params.password
      );
    });
    if (matched) {
      Cookies.set("session", "true");
      Cookies.set("user", matched.email);
      setTimeout(() => {
        router.push(`/chat/${generateUUID()}`);
        setIsLoading(false);
      }, 2000);
    } else {
      toast.error("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-8 tw-w-[520px]">
        <section className="tw-flex tw-justify-center">
          <span className="tw-text-3xl tw-font-medium">Log in</span>
        </section>
        <section>
          <LoginForm onLogin={onLogin} isLoading={isLoading} />
        </section>
        <section className="tw-flex tw-justify-center tw-gap-2">
          <span className="tw-text-base">Create a new account</span>
          <span className="tw-text-base tw-text-primaryGreen tw-underline tw-underline-offset-4 tw-cursor-pointer">
            Sign up
          </span>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
