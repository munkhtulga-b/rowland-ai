import { TypeProfileUpdateUser, TypeProfileUpdateResponse } from "@/app/_types/user/TypeProfileUpdateUser";
import fetchData from "../config";

const updateUserProfile = async (body: TypeProfileUpdateUser, id: string) => {
  return fetchData<TypeProfileUpdateResponse, TypeProfileUpdateUser>(
    "users/" + id,
    "PATCH",
    body
  );
};

export default updateUserProfile;
