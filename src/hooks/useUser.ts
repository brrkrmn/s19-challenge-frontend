import userService from "@/service/user/user";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: userService.getAll,
    staleTime: 3000,
  });
}

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["getUser", id],
    queryFn: () => userService.getById(id),
    staleTime: 3000,
  });
}

export const useFollow = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["follow", id],
    mutationFn: () => userService.follow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow"] });
    },
    onError: (error) => {
      addToast({
        title: "Failed to follow/unfollow",
        description: error.message,
        color: "danger",
      });
    }
  })
}