import { backendService } from "@/api";
import { API_URLS } from "@/api/api.constants";
import { config } from "@/utils/setBasicAuth";
import { CommentRequest, CommentResponse } from "./comment.types";

const commentService = {
  getAll: async () => {
    const response = await backendService.get<CommentResponse[]>(
      API_URLS.comments.main,
      config
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await backendService.get<CommentResponse>(
      API_URLS.comments.id(id),
      config
    );
    return response.data;
  },
  create: async (id: string, data: CommentRequest) => {
    const response = await backendService.post<CommentResponse>(
      API_URLS.comments.id(id),
      data,
      config
    );
    return response.data;
  },
  update: async (id: string, data: CommentRequest) => {
    const response = await backendService.put<CommentResponse>(
      API_URLS.comments.id(id),
      data,
      config
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await backendService.delete<void>(
      API_URLS.comments.id(id),
      config
    );
    return response.data;
  },
};

export default commentService;