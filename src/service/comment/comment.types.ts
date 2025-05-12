export type CommentResponse = {
  id: string;
  content: string;
  tweetId: string;
  userId: string;
  username: string;
};

export type CommentRequest = {
  content: string;
};