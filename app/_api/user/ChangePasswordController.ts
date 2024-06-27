import {
    TypeResetPasswordResponse,
  } from "@/app/_types/auth/TypeResetPasswordBody";
  import { TypeChangePassword } from "@/app/_types/user/TypeProfileUpdateUser";
  import fetchData from "../config";
  
  const changePassword = async (body: TypeChangePassword) => {
    return fetchData<TypeResetPasswordResponse, TypeChangePassword>(
      "auth/change-password",
      "POST",
      body
    );
  };
  
  export default changePassword;
  