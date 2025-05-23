import { backendService } from "@/api";
import { API_URLS } from "@/api/api.constants";
import { UserResponse } from "../user/user.types";
import { LoginRequest, SignupRequest } from "./auth.types";

const authService = {
  signup: async (data: SignupRequest) => {
    const response = await backendService.post<UserResponse>(
      API_URLS.auth.signup,
      data
    );
    return response.data;
  },
  login: async (data: LoginRequest) => {
    const response = await backendService.post<UserResponse>(
      API_URLS.auth.login,
      data
    );
    return response.data;
  },
};

export default authService;
