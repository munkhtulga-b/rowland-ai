import SignupForm from "@/app/_components/auth/SignupForm";

const SignupPage = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-8 tw-max-w-[520px] tw-w-full">
        <section className="tw-flex tw-justify-center">
          <span className="tw-text-3xl tw-font-medium">Sign up</span>
        </section>
        <section>
          <SignupForm />
        </section>
        <section className="tw-flex tw-justify-center tw-gap-2">
          <span className="tw-text-base">Already have an account</span>
          <span className="tw-text-base tw-text-primaryGreen tw-underline tw-underline-offset-4 tw-cursor-pointer">
            Login
          </span>
        </section>
      </div>
    </>
  );
};

export default SignupPage;
