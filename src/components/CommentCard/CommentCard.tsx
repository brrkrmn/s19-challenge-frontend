import { useAuthContext } from "@/context/AuthContext";
import { useDeleteComment } from "@/hooks/useComment";
import { useGetTweet } from "@/hooks/useTweet";
import { CommentResponse } from "@/service/comment/comment.types";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const CommentCard = ({ comment }: { comment: CommentResponse }) => {
  const { user: authUser } = useAuthContext();
  const { data: tweet } = useGetTweet(comment.tweetId);
  const deleteCommentMutation = useDeleteComment(comment.id);
  // const editCommentMutation = useEditComment(comment.id);

  const isTweetOwner = authUser?.id.toString() === tweet?.user.id.toString();
  const isCommentOwner = authUser?.id.toString() === comment.userId.toString();

  if (!authUser || !tweet) return null;
  return (
    <div
      className="w-full max-w-[500px] text-wrap break-all relative"
      key={comment.id}
    >
      {(isTweetOwner || isCommentOwner) && (
        <Dropdown>
          <DropdownTrigger className="absolute top-6 right-0">
            <Button size="sm" variant="light" isIconOnly className="text-xl">
              <BsThreeDots />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="bordered">
            {authUser.id === comment.userId ? (
              <DropdownItem startContent={<FiEdit />} key="edit">
                Edit
              </DropdownItem>
            ) : null}
            <DropdownItem
              className="text-danger hover:text-danger"
              startContent={<FaRegTrashAlt />}
              key="delete"
              onPress={() => deleteCommentMutation.mutate()}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <Divider className="my-4" />
      <Link href={`/user/${comment.userId}`} className="flex gap-5">
        <Avatar
          isBordered
          radius="full"
          size="md"
          showFallback
          src="https://images.unsplash.com/broken"
          className="min-w-10 h-10"
        />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h5 className="text-md tracking-tight text-default-400">
            @{comment.username}
          </h5>
          {comment.content}
        </div>
      </Link>
    </div>
  );
};

export default CommentCard;
