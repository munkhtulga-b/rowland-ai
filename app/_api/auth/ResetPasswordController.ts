import {
  TypeResetPasswordRequest,
  TypeResetPasswordResponse,
} from "@/app/_types/auth/TypeResetPasswordBody";
import fetchData from "../config";

const reset = async (body: TypeResetPasswordRequest, token: string) => {
  return fetchData<TypeResetPasswordResponse, TypeResetPasswordRequest>(
    `auth/reset-password?token=${token}`,
    "POST",
    body
  );
};

export default reset;
