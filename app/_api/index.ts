// AUTH API
import login from "@/app/_api/auth/LoginController";
import register from "@/app/_api/auth/SignupController";
import verify from "@/app/_api/auth/VerifyEmailController";
import forgot from "@/app/_api/auth/ForgotPasswordController";
import reset from "@/app/_api/auth/ResetPasswordController";
import logout from "@/app/_api/auth/LogoutController";
import updateUserProfile from "@/app/_api/user/UpdateUserProfileController";
import changePassword from "@/app/_api/user/ChangePasswordController";

// USER API
import * as chat from "@/app/_api/chat/ChatHistoryController";
import * as feedback from "@/app/_api/chat/ChatFeedbackController";

const $api = {
  auth: {
    login,
    register,
    verify,
    forgot,
    reset,
    logout,
  },
  user: {
    chat,
    feedback,
    updateUserProfile,
    changePassword,
  },
};

export default $api;
