"use client";

import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'

const ProfileNavBar = ({ height }: { height: number }) => {
  const router = useRouter()

  return (
    <>
      <nav
        style={{ height: height }}
        className="tw-bg-secondary tw-flex tw-justify-between tw-items-center tw-px-6 md:tw-px-10 tw-w-full"
      >
        <div className="tw-text-white tw-text-2xl hover:tw-cursor-pointer" onClick={() => router.back()}>
          <LeftOutlined />
          <span className="">Profile</span>
        </div>
      </nav>
    </>
  );
};

export default ProfileNavBar;
