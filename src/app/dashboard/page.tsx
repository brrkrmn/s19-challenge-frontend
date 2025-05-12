"use client";

import TweetCard from "@/components/TweetCard/TweetCard";
import { useCreateTweet, useGetTweets } from "@/hooks/useTweet";
import { Button, Divider, Form, Textarea } from "@heroui/react";
import { useState } from "react";

const Dashboard = () => {
  const createTweetMutation = useCreateTweet();
  const [value, setValue] = useState("");
  const { data: tweets } = useGetTweets();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTweetMutation.mutate({ content: value });
    setValue("");
  };

  return (
    <div className="h-full w-full max-w-[500px] flex flex-col items-center justify-start gap-6 pb-40">
      <Form
        className="w-full flex flex-row items-end justify-center"
        onSubmit={handleSubmit}
      >
        <Textarea
          classNames={{
            inputWrapper: "border-danger after:bg-primary text-2xl",
          }}
          maxLength={280}
          size="lg"
          value={value}
          onValueChange={setValue}
          variant="underlined"
          placeholder="What's happening?"
          className="w-full"
        />
        <div className="flex flex-col items-center gap-2">
          <p
            className={`${
              280 - value.length <= 50 ? "text-danger" : "text-foreground-400"
            }`}
          >
            {280 - value.length}
          </p>
          <Button type="submit" variant="ghost" color="primary">
            Post
          </Button>
        </div>
      </Form>
      <Divider className="my-2" />
      <div className="w-full h-full flex flex-col items-center justify-start gap-6">
        {tweets
          ?.slice()
          .reverse()
          .map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
