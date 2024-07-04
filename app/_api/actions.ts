"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const redirectUnauthorized = async () => {
  await cookies().delete("x-user-type");
  await cookies().delete("session");
  await cookies().delete("refresh_token");
  return redirect("/auth/login");
};
