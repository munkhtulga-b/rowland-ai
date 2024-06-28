import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import $api from "@/app/_api";
const LogoutButton = () => {
  const router = useRouter();

  const onLogOut = async () => {
    Cookies.remove("session");
    Cookies.remove("x-user-type");
    Cookies.remove("token");

    const { isOk } = await $api.auth.logout();
    if (isOk) {
      router.push("/");
    }
  };

  return (
    <>
      <div
        className="tw-p-6 tw-rounded-2xl tw-bg-grayLight hover:tw-bg-slate-200 tw-flex tw-flex-row tw-justify-between hover:tw-cursor-pointer"
        onClick={onLogOut}
      >
        <div className="tw-text-lg tw-text-secondaryGray tw-font-medium">
          Log out
        </div>
        <div className="tw-min-w-[24px] tw-max-w-[24px] tw-min-h-[24px] tw-max-h-[24px]">
          <Image
            src="/assets/icons/logout.svg"
            alt="user-icon"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default LogoutButton;
