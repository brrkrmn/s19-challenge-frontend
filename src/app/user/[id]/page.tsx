"use client"

import TweetCard from "@/components/TweetCard/TweetCard";
import UserCard from "@/components/UserCard/UserCard";
import { useAuthContext } from "@/context/AuthContext";
import { useFollow, useGetUser } from "@/hooks/useUser";
import { Avatar, Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: user } = useGetUser(id);
  const { user: authUser } = useAuthContext();
  const followMutation = useFollow(id);
  const [selected, setSelected] = useState<React.Key>("tweets");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (authUser && user) {
      setIsFollowing(user.followers.some((f) => f.id === authUser.id));
    }
  }, [authUser, user]);

  const handleFollow = () => {
    followMutation.mutate();
  };

  if (!user) return null;
  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-32 justify-start items-center gap-2">
      <div className="bg-zinc-900 py-2 px-4 w-[450px] rounded-lg flex items-center justify-start gap-6">
        <Avatar
          className="w-32 h-32"
          showFallback
          src="https://images.unsplash.com/broken"
        />
        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-xl text-primary-400">@{user.username}</p>
          <p className="text-2xl text-foreground font-semibold">{user.name}</p>
          <p className="text-xl text-foreground-300">{user.about}</p>
        </div>
        <Button
          className={
            isFollowing
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowing ? "bordered" : "solid"}
          onPress={handleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
      <Card className="bg-transparent" fullWidth>
        <CardBody className="flex flex-col items-center">
          <Tabs
            radius="full"
            classNames={{
              tabList: "w-[450px]",
            }}
            aria-label="Tabs form"
            size="md"
            className="w-full items-center justify-center"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="tweets" title="Tweets" className="h-full w-full">
              <div className="flex flex-col items-center justify-center gap-6 w-full">
                {user.tweets.map((tweet) => (
                  <TweetCard tweet={tweet} key={tweet.id} />
                ))}
              </div>
            </Tab>
            <Tab key="retweets" title="Retweets" className="h-full w-full">
              <div className="flex flex-col items-center justify-center gap-6">
                {user.retweets.map((tweet) => (
                  <TweetCard tweet={tweet} key={tweet.id} />
                ))}
              </div>
            </Tab>
            <Tab key="likes" title="Likes" className="h-full w-full">
              <div className="flex flex-col items-center justify-center gap-6">
                {user.likes.map((tweet) => (
                  <TweetCard tweet={tweet} key={tweet.id} />
                ))}
              </div>
            </Tab>
            <Tab
              key="followers"
              title="Followers"
              className="flex items-center justify-center gap-10 h-full w-full"
            >
              <div className="flex flex-col items-center justify-center gap-6 flex-wrap">
                {user.followers.map((user) => (
                  <UserCard user={user} key={user.id} />
                ))}
              </div>
            </Tab>
            <Tab key="following" title="Followings" className="h-full w-full">
              <div className="flex flex-col items-center justify-center gap-6 flex-wrap">
                {user.following.map((user) => (
                  <UserCard user={user} key={user.id} />
                ))}
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default User;