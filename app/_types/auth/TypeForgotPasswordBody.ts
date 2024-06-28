export type TypeForgotPasswordRequest = {
  email: string;
};

export type TypeForgotPasswordResponse = {
  success: boolean;
  error: {
    message: string;
  }
};
