import TypeUser from "./TypeUser";

export type TypeSignupRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName?: string;
};

export type TypeSignupResponse = {
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
};
