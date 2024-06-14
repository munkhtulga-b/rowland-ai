import Image from "next/image";

const AuthNavBar = () => {
  return (
    <>
      <div className="tw-sticky tw-top-0 tw-z-[999] tw-w-full tw-bg-secondary tw-h-[78px] tw-px-10 tw-flex tw-items-center">
        <div className="tw-flex tw-justify-start">
          <Image
            src={"/logo-white.png"}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
            alt="logo"
            unoptimized
            priority
          />
        </div>
      </div>
    </>
  );
};

export default AuthNavBar;
