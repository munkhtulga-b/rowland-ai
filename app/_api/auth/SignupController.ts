import {
  TypeSignupRequest,
  TypeSignupResponse,
} from "@/app/_types/auth/TypeSignupBody";
import fetchData from "../config";

const register = async (body: TypeSignupRequest) => {
  return fetchData<TypeSignupResponse, TypeSignupRequest>(
    "auth/register",
    "POST",
    body
  );
};

export default register;
