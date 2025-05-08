export type SignupRequest = {
  username: string;
  name: string;
  email: string;
  about?: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};
