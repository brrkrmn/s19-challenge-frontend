import { backendService } from "@/api";
import { API_URLS } from "@/api/api.constants";
import { config } from "@/utils/setBasicAuth";
import { TweetRequest, TweetResponse } from "./tweet.types";

const tweetService = {
  getAll: async () => {
    const response = await backendService.get<TweetResponse[]>(
      API_URLS.tweets.main,
      config
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await backendService.get<TweetResponse>(
      API_URLS.tweets.id(id),
      config
    );
    return response.data;
  },
  create: async (data: TweetRequest) => {
    const response = await backendService.post<TweetResponse>(
      API_URLS.tweets.main,
      data,
      config
    );
    return response.data;
  },
  replaceOrCreate: async (id: string, data: TweetRequest) => {
    const response = await backendService.put<TweetResponse>(
      API_URLS.tweets.id(id),
      data,
      config
    );
    return response.data;
  },
  update: async (id: string, data: TweetRequest) => {
    const response = await backendService.patch<TweetResponse>(
      API_URLS.tweets.id(id),
      data,
      config
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await backendService.delete<void>(
      API_URLS.tweets.id(id),
      config
    );
    return response.data;
  },
  like: async (id: string) => {
    const response = await backendService.post<TweetResponse>(
      API_URLS.tweets.like(id),
      null,
      config
    );
    return response.data;
  },
  retweet: async (id: string) => {
    const response = await backendService.post<TweetResponse>(
      API_URLS.tweets.retweet(id),
      null,
      config
    );
    return response.data;
  },
};

export default tweetService;