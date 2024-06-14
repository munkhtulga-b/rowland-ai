import LoginForm from "@/app/_components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-8 tw-w-[520px]">
        <section className="tw-flex tw-justify-center">
          <span className="tw-text-3xl tw-font-medium">Log in</span>
        </section>
        <section>
          <LoginForm />
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
