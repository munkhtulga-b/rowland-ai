// AUTH API
import login from "@/app/_api/auth/LoginController";
import register from "@/app/_api/auth/SignupController";
import verify from "@/app/_api/auth/VerifyEmailController";
import forgot from "@/app/_api/auth/ForgotPasswordController"
import reset from "@/app/_api/auth/ResetPasswordController"

import * as chat from "@/app/_api/chat/ChatHistoryController"

const $api = {
  auth: {
    login,
    register,
    verify,
    forgot,
    reset,
  },
  user: {
    chat,
  },
};

export default $api;
