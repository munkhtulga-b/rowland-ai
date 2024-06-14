const fetchData = async (endpoint: string, method: string, body: unknown) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  console.log(baseURL, endpoint, method, body);

  try {
    const requestHeaders = {
      "Content-Type": "application/json",
      "X-User-Type": "0",
    };

    // eslint-disable-next-line no-undef
    const init: RequestInit = {
      method: method,
      headers: requestHeaders,
      cache: "default",
    };

    if (body) {
      init["body"] = JSON.stringify(body);
    }

    const response = await fetch(`${baseURL}/${endpoint}`, init);

    const isOk = response.ok;
    const status = response.status;
    const data = await response.json();

    if (!isOk) {
      console.log("Reqest failed with status: ", status);
    }

    return {
      isOk,
      status,
      data,
    };
  } catch (error) {
    return error;
  }
};

export default fetchData;
