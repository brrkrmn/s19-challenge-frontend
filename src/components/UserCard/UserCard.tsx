import { UserPreview } from "@/service/user/user.types";
import { Avatar, Card, CardHeader } from "@heroui/react";
import Link from "next/link";

const UserCard = ({ user }: { user: UserPreview }) => {
  return (
    <Link href={`/user/${user.id}`}>
      <Card className="w-[250px] hover:bg-zinc-800">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              className="w-16 h-16"
              showFallback
              src="https://images.unsplash.com/broken"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className="text-md text-primary tracking-tight">
                @{user.username}
              </h5>
              <h4 className="text-lg font-semibold leading-none text-default-600">
                {user.name}
              </h4>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default UserCard;



