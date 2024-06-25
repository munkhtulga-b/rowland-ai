// AUTH API
import login from "@/app/_api/auth/LoginController";
import register from "@/app/_api/auth/SignupController";
import verify from "@/app/_api/auth/VerifyEmailController";
import exportCSV from "@/app/_api/admin/ExportCSVController";

const $api = {
  auth: {
    login,
    register,
    verify,
  },
  admin: {
    exportCSV
  },
};

export default $api;
