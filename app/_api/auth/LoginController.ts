import {
  TypeLoginRequest,
  TypeLoginResponse,
} from "@/app/_types/auth/TypeLoginBody";
import fetchData from "../config";

const login = async (
  body: TypeLoginRequest
): Promise<{ isOk: boolean; status: number; data: TypeLoginResponse }> => {
  return fetchData<TypeLoginResponse>("auth/login", "POST", body);
};

export default login;
