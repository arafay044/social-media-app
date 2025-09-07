import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import type { IPost } from "@/Types";

const Saved = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  // always return an array (not undefined)
  const savePosts: IPost[] =
    currentUser?.save
      ?.map((savePost) => ({
        ...savePost.post,
        creator: {
          ...savePost.post.creator,
          imageUrl: savePost.post.creator.imageUrl || "/assets/icons/profile-placeholder.svg",
        },
      }))
      .reverse() || [];

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
