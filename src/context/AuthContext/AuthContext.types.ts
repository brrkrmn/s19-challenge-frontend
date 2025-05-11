import { LoginRequest, SignupRequest } from "@/service/auth/auth.types";
import { UserResponse } from "@/service/user/user.types";

export type AuthContextValue = null | {
  user: UserResponse | null;
  signup: (data: SignupRequest) => void;
  login: (data: LoginRequest) => void;
  logout: () => void;
}