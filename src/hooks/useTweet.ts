import tweetService from "@/service/tweet/tweet";
import { TweetRequest } from "@/service/tweet/tweet.types";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetTweets = () => {
  return useQuery({
    queryKey: ["getTweets"],
    queryFn: tweetService.getAll,
    staleTime: 3000,
  });
};

export const useGetTweet = (id: string) => {
  return useQuery({
    queryKey: ["getTweet", id],
    queryFn: () => tweetService.getById(id),
    staleTime: 3000,
  });
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTweet"],
    mutationFn: (data: TweetRequest) => {
      return tweetService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      addToast({
        title: "Tweet posted successfully!",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to post tweet",
        description: error.message,
        color: "danger",
      });
    },
  });
};

export const useReplaceTweet = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["replaceTweet", id],
    mutationFn: (data: TweetRequest) => {
      return tweetService.replaceOrCreate(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replaceTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Tweet edited successfully!",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to edit tweet.",
        description: error.message,
        color: "danger",
      });
    },
  });
};

export const useEditTweet = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTweet", id],
    mutationFn: (data: TweetRequest) => {
      return tweetService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Tweet updated successfully",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to update tweet",
        description: error.message,
        color: "danger",
      });
    },
  });
};

export const useDeleteTweet = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteTweet", id],
    mutationFn: () => {
      return tweetService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Tweet deleted successfully",
        color: "success",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      addToast({
        title: "Failed to delete tweet",
        description: error.message,
        color: "danger",
      });
    },
  });
};

export const useLikeTweet = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["likeTweet", id],
    mutationFn: () => {
      return tweetService.like(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      addToast({
        title: "Tweet liked successfully",
        color: "primary",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to like tweet",
        description: error.message,
        color: "danger",
      });
    },
  });
};

export const useRetweet = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["retweet", id],
    mutationFn: () => {
      return tweetService.retweet(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      addToast({
        title: "Tweet retweeted successfully",
        color: "primary",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to retweet tweet",
        description: error.message,
        color: "danger",
      });
    },
  });
};