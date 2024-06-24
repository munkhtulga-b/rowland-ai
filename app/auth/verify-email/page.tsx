"use client";

import { Button } from "antd";
import Image from "next/image";
import $api from "@/app/_api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    setIsLoading(true);
    const verifyToken = searchParams.get("token");
    if (verifyToken) {
      const { isOk, data } = await $api.auth.verify(verifyToken);
      if (isOk) {
        setIsSuccess(data?.message?.success);
      }
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
          {isSuccess ? (
            <>
              <Image
                src={`/assets/auth/confirm-email-sent-vector.svg`}
                alt="email-sent"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
                priority
              />
              <section>
                <p className="tw-text-lg tw-text-primaryGray tw-font-medium tw-text-center">
                  {`Thank you for confirming your email. Your registration is now complete.`}
                </p>
              </section>
              <section className="tw-w-full">
                <Button
                  onClick={() => router.push("/auth/login")}
                  type="primary"
                  className="tw-w-full"
                >
                  Go to login
                </Button>
              </section>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default VerifyEmailPage;
