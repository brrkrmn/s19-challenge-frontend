"use client";

import CommentCard from "@/components/CommentCard/CommentCard";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateComment } from "@/hooks/useComment";
import { useGetTweet, useLikeTweet, useRetweet } from "@/hooks/useTweet";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Textarea,
} from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa6";

const Tweet = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: tweet } = useGetTweet(id);
  const retweetMutation = useRetweet(tweet?.id || "");
  const likeMutation = useLikeTweet(tweet?.id || "");
  const { user: authUser } = useAuthContext();
  const [retweeted, setRetweeted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [value, setValue] = useState("");
  const createCommentMutation = useCreateComment(id);

  useEffect(() => {
    if (authUser && tweet) {
      setLiked(authUser.likes.some((likedTweet) => likedTweet.id === tweet.id));
      setRetweeted(
        authUser.retweets.some((retweet) => retweet.id === tweet.id)
      );
    }
  }, [authUser, tweet]);

  const handleLike = () => {
    likeMutation.mutate();
    setLiked(!liked);
  };

  const handleRetweet = () => {
    retweetMutation.mutate();
    setRetweeted(!retweeted);
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation.mutate({ content: value });
    setValue("");
  };

  if (!tweet) return null;
  return (
    <div className="pb-40">
      <Card className="bg-transparent w-full max-w-[500px] gap-2">
        <CardHeader className="justify-between">
          <Link href={`/user/${tweet.user.id}`} className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="lg"
              showFallback
              src="https://images.unsplash.com/broken"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-xl font-semibold leading-none text-default-600">
                {tweet.user.name}
              </h4>
              <h5 className="text-md tracking-tight text-default-400">
                @{tweet.user.username}
              </h5>
            </div>
          </Link>
        </CardHeader>
        <CardBody className="px-3 py-0 text-lg text-default-600">
          <p className="text-ellipsis">{tweet.content}</p>
        </CardBody>
        <CardFooter className="gap-6">
          <button className="transition flex gap-1 items-center justify-center text-default-400 hover:text-primary text-md cursor-pointer">
            <p className="font-semibold">{tweet.comments.length}</p>
            <FaRegComment />
          </button>
          <button
            onClick={handleRetweet}
            className={`${
              retweeted ? "text-success" : "text-default-400"
            } transition flex gap-1 items-center justify-center hover:text-success cursor-pointer`}
          >
            <p className="font-semibold text-md">{tweet.retweetedBy.length}</p>
            <FaRetweet className="text-xl" />
          </button>
          <button
            onClick={handleLike}
            className={`${
              liked ? "text-danger" : "text-default-400"
            } transition flex gap-1 items-center justify-center text-md hover:text-danger cursor-pointer`}
          >
            <p className="font-semibold">{tweet.likedBy.length}</p>
            <FaRegHeart />
          </button>
        </CardFooter>
      </Card>
      <Divider className="my-2" />
      <div className="w-full flex flex-col items-center justify-start gap-4">
        <Form
          className="w-full min-w-full max-w-xs flex items-end justify-center"
          onSubmit={handleComment}
        >
          <Textarea
            maxRows={2}
            classNames={{
              inputWrapper:
                "bg-zinc-900 data-[hover=true]:bg-zinc-800 group-data-[focus=true]:bg-zinc-800",
              input: "text-lg",
            }}
            maxLength={280}
            size="md"
            value={value}
            onValueChange={setValue}
            variant="flat"
            placeholder="Post your reply"
          />
          <div className="flex items-center justify-center gap-2">
            <p
              className={`${
                280 - value.length <= 50 ? "text-danger" : "text-foreground-400"
              }`}
            >
              {280 - value.length}
            </p>
            <Button type="submit" variant="ghost" color="primary">
              Reply
            </Button>
          </div>
        </Form>
        {tweet.comments
          .slice()
          .reverse()
          .map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default Tweet;