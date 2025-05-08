export type CommentResponse = {
  id: string;
  content: string;
  tweetId: string;
  userId: string;
};

export type CommentRequest = {
  content: string;
};