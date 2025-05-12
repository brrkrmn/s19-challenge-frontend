"use client";

import TweetCard from "@/components/TweetCard/TweetCard";
import UserCard from "@/components/UserCard/UserCard";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useState } from "react";

const User = () => {
  const [selected, setSelected] = useState<React.Key>("tweets");
  const { user } = useAuthContext();
  console.log(user);
  if (!user) return null;
  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-32 justify-start items-center gap-10">
      <div className="bg-zinc-900 py-2 px-4 rounded-lg w-[40%] flex items-center justify-start gap-6">
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
      </div>
      <Card fullWidth>
        <CardBody>
          <Tabs
            fullWidth
            aria-label="Tabs form"
            size="md"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="tweets" title="Tweets" className="h-full">
              {user.tweets.map((tweet) => (
                <TweetCard tweet={tweet} key={tweet.id} />
              ))}
            </Tab>
            <Tab key="retweets" title="Retweets">
              {user.retweets.map((tweet) => (
                <TweetCard tweet={tweet} key={tweet.id} />
              ))}
            </Tab>
            <Tab key="likes" title="Likes">
              {user.likes.map((tweet) => (
                <TweetCard tweet={tweet} key={tweet.id} />
              ))}
            </Tab>
            <Tab
              key="followers"
              title="Followers"
              className="flex items-center justify-center gap-10"
            >
              {user.followers.map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
            </Tab>
            <Tab key="following" title="Followings">
              <div className="flex items-center justify-center gap-10 flex-wrap">
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
