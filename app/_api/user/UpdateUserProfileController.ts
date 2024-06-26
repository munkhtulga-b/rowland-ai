import {
    TypeSignupResponse,
  } from "@/app/_types/auth/TypeSignupBody";
  import { TypeProfileUpdateUser } from "@/app/_types/user/TypeProfileUpdateUser";
  import fetchData from "../config";
  
  const updateUserProfile = async (body: TypeProfileUpdateUser, id: string) => {
    return fetchData<TypeSignupResponse, TypeProfileUpdateUser>(
      "users/"+ id,
      "PATCH",
      body
    );
  };
  
  export default updateUserProfile;
  