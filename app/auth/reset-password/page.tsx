"use client";

import $api from "@/app/_api";
import EmailSent from "@/app/_components/auth/EmailSent";
import ResetPasswordForm from "@/app/_components/auth/ResetPasswordForm";
import { TypeResetPasswordRequest } from "@/app/_types/auth/TypeResetPasswordBody";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const resetPassword = async (params: TypeResetPasswordRequest) => {
    setIsLoading(true);
    const token = searchParams.get("token");
    if (token) {
      const { isOk } = await $api.auth.reset(params, token);
      if (isOk) {
        setIsSuccess(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isSuccess ? (
        <div className="tw-flex tw-flex-col tw-gap-8 tw-w-[520px]">
          <section className="tw-flex tw-justify-center">
            <span className="tw-text-3xl tw-font-medium">New password</span>
          </section>
          <section>
            <ResetPasswordForm
              onComplete={resetPassword}
              isLoading={isLoading}
            />
          </section>
        </div>
      ) : (
        <div className="tw-w-[520px]">
          <EmailSent type="confirm" message="Password reset is complete." />
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
