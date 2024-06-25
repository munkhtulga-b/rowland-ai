import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

    console.log(response);

    if (!isOk) {
      const error = data as {
        code: number;
        message: string;
      };
      toast.error(error.message);
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
