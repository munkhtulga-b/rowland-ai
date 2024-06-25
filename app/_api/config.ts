import Cookies from "js-cookie";

type TypeSuccessResponse<T> = T;

type TypeErrorResponse = {
  code: number;
  message: string;
};

const fetchData = async <T>(
  endpoint: string,
  method: string,
  body?: any
): Promise<{
  isOk: boolean;
  status: number;
  data: TypeSuccessResponse<T> | TypeErrorResponse;
}> => {
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
    const data = await response.json();

    if (!isOk) {
      console.log("Reqest failed with status: ", status);
      return {
        isOk,
        status,
        data: data as TypeErrorResponse,
      };
    }

    return {
      isOk,
      status,
      data: data as TypeSuccessResponse<T>,
    };
  } catch (error) {
    return {
      isOk: false,
      status: 500,
      data: {
        code: 500,
        message: "Internal Server Error",
      } as TypeErrorResponse,
    };
  }
};

export default fetchData;
