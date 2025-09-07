import { useUserContext } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import type { IPost } from '@/Types';

type GridPostListProps = {
  posts: IPost[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => {
        const creator = post.creator; // already typed as ICreator

        return (
          <li key={post.$id} className="relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              <img
                src={post.imageUrl}
                alt="post"
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="grid-post_user">
              {showUser && creator && (
                <div className="flex items-center gap-2">
                  <img
                    src={creator.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt={creator.name || "creator"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="small-medium text-light-1">{creator.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GridPostList;
