// AUTH API
import login from "@/app/_api/auth/LoginController";
import register from "@/app/_api/auth/SignupController";
import verify from "@/app/_api/auth/VerifyEmailController";

const $api = {
  auth: {
    login,
    register,
    verify,
  },
};

export default $api;
