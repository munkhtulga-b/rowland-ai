export type TypeResetPasswordRequest = {
  password: string;
};

export type TypeResetPasswordResponse = {
  success: boolean;
  error: {
    message: string;
  }
};
