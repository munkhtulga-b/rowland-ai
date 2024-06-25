import {
  TypeForgotPasswordRequest,
  TypeForgotPasswordResponse,
} from "@/app/_types/auth/TypeForgotPasswordBody";
import fetchData from "../config";

const forgot = async (body: TypeForgotPasswordRequest) => {
  return fetchData<TypeForgotPasswordResponse, TypeForgotPasswordRequest>(
    `auth/forgot-password`,
    "POST",
    body
  );
};

export default forgot;
