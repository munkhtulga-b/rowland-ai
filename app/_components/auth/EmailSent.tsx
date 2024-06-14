import Image from "next/image";

const EmailSent = ({ email }: { email?: string | null }) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
        <Image
          src="/assets/auth/email-sent-vector.svg"
          alt="email-sent"
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
          priority
        />
        <section>
          <p className="tw-text-lg tw-text-primaryGray tw-font-medium tw-text-center">
            {`A password reset email has been sent to the registered email address
            (${
              email ?? "email address"
            }). Check your email and go to the password reset page
            from the link in the email.`}
          </p>
        </section>
      </div>
    </>
  );
};

export default EmailSent;
