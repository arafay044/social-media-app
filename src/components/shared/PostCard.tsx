import { useUserContext } from '@/context/AuthContext';
import { getUserById } from '@/lib/appwrite/api';
import { multiFormatDateString } from '@/lib/utils';
import type { Models } from 'appwrite';
import React from 'react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
  post: Models.Document;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUserContext();


  // State for creator: either already populated or null initially
  const [creator, setCreator] = React.useState<Models.Document | null>(
    typeof post.creator === 'object' ? post.creator : null
  );

  React.useEffect(() => {
    async function fetchCreator() {
      if (typeof post.creator === 'string') {
        try {
          const fetchedUser = await getUserById(post.creator);
          setCreator(fetchedUser);
        } catch (error) {
          console.log('Failed to fetch creator:', error);
        }
      }
    }

    fetchCreator();
  }, [post.creator]);

  if (!creator) return null; // or a loader

  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${creator.$id}`}>
            <img
              src={creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt='creator'
              className='w-12 lg:h-12 rounded-full'
            />
          </Link>
          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>{creator.name}</p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {multiFormatDateString(post.$createdAt)}
              </p>
              {post.location && (
                <>
                  -<p className='subtle-semibold lg:small-regular'>{post.location}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Show edit button only if current user is the creator */}
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== creator.$id ? 'hidden' : ''}`}
        >
          <img src='/assets/icons/edit.svg' alt='edit' width={20} height={20} />
        </Link>
      </div>
      <Link to={`posts/${post.$id}`}>
             <div className='small-medium lg:base-medium py-5'>
                <p>{post.caption}</p>
                <ul className='flex gap-1 mt-2'>
                    {post.tags.map((tag: string) => (
                        <li key={tag} className='text-light-3'>
                            #{tag}
                        </li>
                    ))}
                </ul>    
            </div>
            <img src={post.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="post image" className='post-card_img'/>
      </Link>
      <PostStats post={post} userId={user.id}/>
    </div>
  );
};

export default PostCard;
