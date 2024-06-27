
import fetchData from "../config";

type TypeMessage = {
    message: string;
}

const logout = async () => {
    return fetchData<TypeMessage, null>(
        "auth/logout",
        "POST",
    );
};

export default logout;
