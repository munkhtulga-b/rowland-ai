import {
  TypeLoginRequest,
  TypeLoginResponse,
} from "@/app/_types/auth/TypeLoginBody";
import fetchData from "../config";

const login = async (body: TypeLoginRequest) => {
  return fetchData<TypeLoginResponse, TypeLoginRequest>(
    "auth/login",
    "POST",
    body
  );
};

export default login;
