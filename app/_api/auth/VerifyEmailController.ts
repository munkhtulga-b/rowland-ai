import fetchData from "../config";

type TypeVerificationResponse = {
  message: {
    success: boolean;
  };
};

const verify = async (token: string) => {
  return fetchData<TypeVerificationResponse, null>(
    `auth/verify-email?token=${token}`,
    "POST"
  );
};

export default verify;
