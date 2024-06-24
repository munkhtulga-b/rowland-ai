import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EmailSent = ({
  email,
  type,
}: {
  email?: string | null;
  type: string | undefined;
}) => {
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
        <Image
          src={`/assets/auth/${
            type === "confirm"
              ? "confirm-email-sent-vector"
              : "email-sent-vector"
          }.svg`}
          alt="email-sent"
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
          priority
        />
        <section>
          <p className="tw-text-lg tw-text-primaryGray tw-font-medium tw-text-center">
            {type === "reset"
              ? `A password reset email has been sent to the registered email address
            (${
              email ?? "email address"
            }). Check your email and go to the password reset page
            from the link in the email.`
              : `A confirmation email has been sent to the registered email address${
                  email ? ` (${email})` : ""
                }. Please check the email and access the confirmation page from the link in the text.`}
          </p>
        </section>
        <section className="tw-w-full">
          <Button
            onClick={() => router.push("/auth/login")}
            type="primary"
            className="tw-w-full"
          >
            Back to login
          </Button>
        </section>
      </div>
    </>
  );
};

export default EmailSent;
