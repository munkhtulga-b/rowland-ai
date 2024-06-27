"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation'

const ProfileNavBar = ({ height }: { height: number }) => {
  const router = useRouter()

  return (
    <>
      <nav
        style={{ height: height }}
        className="tw-bg-secondary tw-flex tw-justify-between tw-items-center tw-px-6 md:tw-px-10 tw-w-full"
      >
        <div className="tw-flex tw-flex-row tw-items-center tw-text-white tw-text-2xl hover:tw-cursor-pointer" onClick={() => router.back()}>
          <div className="tw-min-w-[28px] tw-max-w-[28px] tw-min-h-[28px] tw-max-h-[28px]">
            <Image
              src="/assets/icons/chevron-left.svg"
              alt="chevron-left-icon"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              priority
            />
          </div>
          <div className="">Profile</div>
        </div>
      </nav>
    </>
  );
};

export default ProfileNavBar;
