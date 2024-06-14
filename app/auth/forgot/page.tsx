"use client";

import EmailSent from "@/app/_components/auth/EmailSent";
import ForgotPasswordForm from "@/app/_components/auth/ForgotPasswordForm";
import { useEffect, useState } from "react";

const ForgotPasswordPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setIsEmailSent(false);
    setEmail(null);
  }, []);

  return (
    <>
      {!isEmailSent ? (
        <div className="tw-flex tw-flex-col tw-gap-8 tw-w-[520px]">
          <section className="tw-flex tw-justify-center">
            <span className="tw-text-3xl tw-font-medium">Forgot password</span>
          </section>
          <section>
            <ForgotPasswordForm />
          </section>
        </div>
      ) : (
        <div className="tw-w-[520px]">
          <EmailSent email={email} />
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
