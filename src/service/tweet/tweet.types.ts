import { CommentResponse } from "../comment/comment.types";
import { UserPreview } from "../user/user.types";

export type TweetResponse = {
  id: string;
  content: string;
  user: UserPreview;
  likedBy: UserPreview[];
  comments: CommentResponse[];
  retweetedBy: UserPreview[];
}

export type TweetRequest = {
  content: string;
}