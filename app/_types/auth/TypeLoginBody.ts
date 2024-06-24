export type TypeLoginRequest = {
  email: string;
  password: string;
};

export type TypeLoginResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
};
