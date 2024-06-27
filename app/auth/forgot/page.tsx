"use client";

import $api from "@/app/_api";
import EmailSent from "@/app/_components/auth/EmailSent";
import ForgotPasswordForm from "@/app/_components/auth/ForgotPasswordForm";
import { TypeForgotPasswordRequest } from "@/app/_types/auth/TypeForgotPasswordBody";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentEmailAddress, setSentEmailAddress] = useState<string | null>(null);

  const sendVerificationEmail = async (params: TypeForgotPasswordRequest) => {
    setIsLoading(true);
    const { isOk } = await $api.auth.forgot(params);
    if (isOk) {
      setSentEmailAddress(params.email);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!sentEmailAddress ? (
        <div className="tw-flex tw-flex-col tw-gap-8 tw-w-[520px]">
          <section className="tw-flex tw-justify-center">
            <span className="tw-text-3xl tw-font-medium">Forgot your password?</span>
          </section>
          <section>
            <ForgotPasswordForm
              onComplete={sendVerificationEmail}
              isLoading={isLoading}
            />
          </section>
        </div>
      ) : (
        <div className="tw-w-[520px]">
          <EmailSent email={sentEmailAddress} type="reset" />
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
