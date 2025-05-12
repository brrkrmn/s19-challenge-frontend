import { CommentResponse } from "../comment/comment.types";
import { TweetResponse } from "../tweet/tweet.types";

export type UserResponse = {
  id: string;
  name: string;
  username: string;
  password: string;
  about?: string;
  following: UserPreview[];
  followers: UserPreview[];
  tweets: TweetResponse[];
  likes: TweetResponse[];
  retweets: TweetResponse[];
  comments: CommentResponse[];
  authorities: Authority[];
};

export type UserPreview = {
  id: string;
  name: string;
  username: string;
  about: string;
};

export type Authority = {
  authority: "USER" | "ADMIN";
};
