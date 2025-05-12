import { useAuthContext } from "@/context/AuthContext";
import { useLikeTweet, useRetweet } from "@/hooks/useTweet";
import { TweetResponse } from "@/service/tweet/tweet.types";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa6";

const TweetCard = ({ tweet }: { tweet: TweetResponse }) => {
  const retweetMutation = useRetweet(tweet.id);
  const likeMutation = useLikeTweet(tweet.id);
  const [retweeted, setRetweeted] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user: authUser } = useAuthContext();

  useEffect(() => {
    if (authUser && tweet) {
      setLiked(authUser.likes.some((likedTweet) => likedTweet.id === tweet.id));
      setRetweeted(authUser.retweets.some((retweet) => retweet.id === tweet.id));
    }
  }, [authUser, tweet])

  const handleLike = () => {
    likeMutation.mutate();
    setLiked(!liked);
  }

  const handleRetweet = () => {
    retweetMutation.mutate();
    setRetweeted(!retweeted);
  }

  return (
    <Card className="hover:bg-content2 w-full max-w-[450px]">
      <Link className="" href={`/tweet/${tweet.id}`}>
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              showFallback
              src="https://images.unsplash.com/broken"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {tweet.user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @{tweet.user.username}
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p className="text-ellipsis">{tweet.content}</p>
        </CardBody>
      </Link>
      <CardFooter className="gap-6">
        <Link
          href={`/tweet/${tweet.id}`}
          className="transition flex gap-1 items-center justify-center text-default-400 hover:text-primary text-small cursor-pointer"
        >
          <p className="font-semibold">{tweet.comments.length}</p>
          <FaRegComment />
        </Link>
        <button
          onClick={handleRetweet}
          className={`${
            retweeted ? "text-success" : "text-default-400"
          } transition flex gap-1 items-center justify-center hover:text-success cursor-pointer`}
        >
          <p className="font-semibold text-small">{tweet.retweetedBy.length}</p>
          <FaRetweet className="text-lg" />
        </button>
        <button
          onClick={handleLike}
          className={`${
            liked ? "text-danger" : "text-default-400"
          } transition flex gap-1 items-center justify-center text-small hover:text-danger cursor-pointer`}
        >
          <p className="font-semibold">{tweet.likedBy.length}</p>
          <FaRegHeart />
        </button>
      </CardFooter>
    </Card>
  );
}

export default TweetCard;