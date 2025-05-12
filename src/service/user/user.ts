import { backendService } from "@/api";
import { API_URLS } from "@/api/api.constants";
import { config } from "@/utils/setBasicAuth";
import { UserResponse } from "./user.types";

const userService = {
  getAll: async () => {
    const response = await backendService.get<UserResponse[]>(
      API_URLS.users.main,
      config
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await backendService.get<UserResponse>(
      API_URLS.users.id(id),
      config
    );
    return response.data;
  },
  follow: async (id: string) => {
    const response = backendService.post<void>(
      API_URLS.users.follow(id),
      null,
      config
    );
    return (await response).data;
  },
};

export default userService;