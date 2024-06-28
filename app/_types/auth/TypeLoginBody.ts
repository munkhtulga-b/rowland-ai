import TypeUser from "./TypeUser";

export type TypeLoginRequest = {
  email: string;
  password: string;
};

export type TypeLoginResponse = {
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
  user: TypeUser;
  error: {
    message: string;
  }
};
