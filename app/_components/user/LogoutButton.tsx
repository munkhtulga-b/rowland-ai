import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
    const router = useRouter();

    const onLogOut = () => {
        Cookies.remove("session");
        router.push("/")
    }

    return <>
        <div className="tw-flex tw-flex-row tw-justify-between hover:tw-cursor-pointer" onClick={onLogOut}>
            <div className="tw-text-lg tw-text-secondaryGray tw-font-medium">Log Out</div>
            <div className="tw-text-2xl">
                <Image
                    src="/assets/logout.svg"
                    alt="user-icon"
                    width={24}
                    height={24}
                    unoptimized
                    priority
                />
            </div>
        </div>
    </>
}

export default LogoutButton