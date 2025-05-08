export type SignupRequest = {
  username: string;
  name: string;
  email: string;
  about?: string;
  password: string;
}

export type LoginRequest = {
  username: string;
  password: string;
}

export type UserResponse = {
  id: string;
  name: string;
  username: string;
  about?: string;
  following: UserPreview[];
  followers: UserPreview[];
  tweets: TweetResponse[];
  likes: TweetResponse[];
  retweets: TweetResponse[];
  comments: CommentResponse[];
  authorities: Authority[];
}

export type UserPreview = {
  id: string;
  name: string;
  username: string;
}

export type TweetResponse = {
  id: string;
  content: string;
  user: UserPreview;
  likedBy: UserPreview[];
  comments: CommentResponse[];
  retweetedBy: UserPreview[];
}

export type CommentResponse = {
  id: string;
  content: string;
  tweetId: string;
  userId: string;
}

export type Authority = {
  authority: "USER" | "ADMIN";
}