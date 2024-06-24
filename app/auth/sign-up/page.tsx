"use client";

import $api from "@/app/_api";
import EmailSent from "@/app/_components/auth/EmailSent";
import SignupForm from "@/app/_components/auth/SignupForm";
import { TypeSignupRequest } from "@/app/_types/auth/TypeSignupBody";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SignupPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [sentEmailAddress, setSentEmailAddress] = useState<string | null>(null);

  const registerUser = async (body: TypeSignupRequest) => {
    setIsLoading(true);
    const { isOk, data } = await $api.auth.register(body);
    if (isOk) {
      setSentEmailAddress(data.user.email);
    }
    setIsLoading(false);
  };

  const motionVariants = {
    hidden: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!sentEmailAddress ? (
          <motion.div
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="tw-flex tw-flex-col tw-gap-8"
          >
            <section className="tw-flex tw-justify-center">
              <span className="tw-text-3xl tw-font-medium">Sign up</span>
            </section>
            <section>
              <SignupForm onComplete={registerUser} isLoading={isLoading} />
            </section>
            <section className="tw-flex tw-justify-center tw-gap-2">
              <span className="tw-text-base">Already have an account</span>
              <span
                onClick={() => router.push("/auth/login")}
                className="tw-text-base tw-text-primaryGreen tw-underline tw-underline-offset-4 tw-cursor-pointer"
              >
                Login
              </span>
            </section>
          </motion.div>
        ) : (
          <motion.div
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            className="tw-w-full"
          >
            <EmailSent email={sentEmailAddress} type="confirm" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignupPage;
