import Image from "next/image";

const SessionNavBar = ({ height }: { height: number }) => {
  return (
    <>
      <nav
        style={{ height: height }}
        className="tw-bg-secondary tw-flex tw-justify-between tw-items-center tw-px-10 tw-w-full"
      >
        <Image
          src={"/logo-no-slogan.png"}
          alt="logo"
          width={0}
          height={0}
          style={{ height: "auto", width: "auto" }}
          unoptimized
          priority
        />
        <div className="tw-bg-white tw-rounded-full tw-min-w-[44px] tw-max-w-[44px] tw-min-h-[44px] tw-max-h-[44px] tw-grid tw-place-items-center">
          <Image
            src={"/assets/navbar/user-icon-black.svg"}
            alt="user-icon"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </nav>
    </>
  );
};

export default SessionNavBar;
