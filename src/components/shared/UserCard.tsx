import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import type { Models } from "appwrite";

// ✅ Define a proper user type with the fields you actually use
export interface IUser extends Models.Document {
  name: string;
  username: string;
  imageUrl: string;
}

type UserCardProps = {
  user: IUser;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
