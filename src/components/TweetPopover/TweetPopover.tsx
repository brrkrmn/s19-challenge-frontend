import { useEditTweet } from "@/hooks/useTweet";
import { TweetResponse } from "@/service/tweet/tweet.types";
import {
  Button,
  Form,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

const TweetPopover = ({ tweet }: { tweet: TweetResponse }) => {
  const [value, setValue] = useState(tweet.content);
  const editMutation = useEditTweet(tweet.id);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMutation.mutate({ content: value });
    setIsOpen(false);
  };

  return (
    <Popover placement="right" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <p>Edit</p>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Edit Tweet
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Form
                className="w-full min-w-full max-w-xs flex items-end justify-center"
                onSubmit={handleSubmit}
              >
                <Textarea
                  maxRows={2}
                  classNames={{
                    inputWrapper:
                      "bg-zinc-900 data-[hover=true]:bg-zinc-800 group-data-[focus=true]:bg-zinc-800",
                    input: "text-md",
                  }}
                  maxLength={280}
                  size="md"
                  value={value}
                  onValueChange={setValue}
                  variant="flat"
                />
                <div className="flex items-center justify-center gap-2">
                  <p
                    className={`${
                      280 - value.length <= 50
                        ? "text-danger"
                        : "text-foreground-400"
                    }`}
                  >
                    {280 - value.length}
                  </p>
                  <Button type="submit" variant="ghost" color="primary">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TweetPopover;
