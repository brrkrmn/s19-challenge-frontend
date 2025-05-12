import commentService from "@/service/comment/comment"
import { CommentRequest } from "@/service/comment/comment.types"
import { addToast } from "@heroui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetComments = () => {
  return useQuery({
    queryKey: ["getComments"],
    queryFn: commentService.getAll,
    staleTime: 3000,
  });
}

export const useGetComment = (id: string) => {
  return useQuery({
    queryKey: ["getComment", id],
    queryFn: () => commentService.getById(id),
    staleTime: 3000,
  });
}

export const useCreateComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createComment", id],
    mutationFn: (data: CommentRequest) => {
      return commentService.create(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createComment"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Comment posted successfully!",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to post comment",
        description: error.message,
        color: "danger",
      });
    },
  });
}

export const useEditComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateComment", id],
    mutationFn: (data: CommentRequest) => {
      return commentService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateComment"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Comment updated successfully",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to update comment",
        description: error.message,
        color: "danger",
      });
    },
  });

}

export const useDeleteComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteComment", id],
    mutationFn: () => {
      return commentService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteComment"] });
      queryClient.invalidateQueries({ queryKey: ["getTweet"] });
      queryClient.invalidateQueries({ queryKey: ["getTweets"] });
      addToast({
        title: "Comment deleted successfully",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to delete comment",
        description: error.message,
        color: "danger",
      });
    },
  });
}