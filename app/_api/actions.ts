"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();

export const redirectUnauthorized = () => {
  cookieStore.delete("session");
  cookieStore.delete("x-user-type");
  cookieStore.delete("token");
  return redirect("/auth/login");
};
