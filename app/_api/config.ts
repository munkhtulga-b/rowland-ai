import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import { redirectUnauthorized } from "./actions";

const fetchData = async <T, U>(
  endpoint: string,
  method: string,
  body?: U
): Promise<{ isOk: boolean; status: number; data: T }> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  try {
    // eslint-disable-next-line no-undef
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // eslint-disable-next-line no-undef
    const init: RequestInit = {
      method: method,
      headers: requestHeaders,
      cache: "default",
      credentials: process.env.NODE_ENV === "development" ? "omit" : "include",
    };

    if (body) {
      const urlEncodedBody = new URLSearchParams(body).toString();
      init["body"] = urlEncodedBody;
    }

    if (process.env.NODE_ENV === "development") {
      const accessToken = Cookies.get("token");
      if (accessToken) {
        requestHeaders["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    const response = await fetch(`${baseURL}${endpoint}`, init);

    const isOk = response.ok;
    const status = response.status;
    const data = (await response.json()) as T;

    if (!isOk) {
      // const error = data as {
      //   error: {
      //     message: string;
      //     rawError: string[];
      //   };
      // };
      // toast.error(error.error.message);
      if (status === 401) {
        const refreshToken = Cookies.get("refresh_token");
        const accessResponse = await fetch(`${baseURL}auth/refresh-tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-type": "1",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
          credentials: "include",
        });
        if (accessResponse.ok && accessResponse.status !== 401) {
          window.location.reload();
        } else {
          redirectUnauthorized();
        }
      }

    }

    return {
      isOk,
      status,
      data,
    };
  } catch (error) {
    return {
      isOk: false,
      status: 500,
      data: error as T,
    };
  }
};

export default fetchData;
