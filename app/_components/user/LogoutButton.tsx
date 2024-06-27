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
            router.push("/")
        }
    }

    return <>
        <div className="tw-flex tw-flex-row tw-justify-between hover:tw-cursor-pointer" onClick={onLogOut}>
            <div className="tw-text-lg tw-text-secondaryGray tw-font-medium">Log out</div>
            <div className="tw-text-2xl">
                <Image
                    src="/assets/logout.svg"
                    alt="user-icon"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                    unoptimized
                    priority
                />
            </div>
        </div>
    </>
}

export default LogoutButton