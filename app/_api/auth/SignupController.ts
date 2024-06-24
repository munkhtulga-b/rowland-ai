import {
  TypeSignupRequest,
  TypeSignupResponse,
} from "@/app/_types/auth/TypeSignupBody";
import fetchData from "../config";

const register = async (
  body: TypeSignupRequest
): Promise<{ isOk: boolean; status: number; data: TypeSignupResponse }> => {
  return fetchData<TypeSignupResponse>("auth/register", "POST", body);
};

export default register;
