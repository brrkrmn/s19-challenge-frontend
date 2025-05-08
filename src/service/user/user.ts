import { backendService } from "@/api";
import { API_URLS } from "@/api/api.constants";
import { UserResponse } from "./user.types";

const userService = {
  getAll: async () => {
    const response = await backendService.get<UserResponse[]>(
      API_URLS.users.main
    )
    return response.data;
  },
  getById: async (id: string) => {
    const response = await backendService.get(
      API_URLS.users.id(id)
    )
    return response.data;
  },
  follow: async (id: string) => {
    const response = backendService.post(
      API_URLS.users.follow(id)
    )
    return (await response).data;
  }
}

export default userService;