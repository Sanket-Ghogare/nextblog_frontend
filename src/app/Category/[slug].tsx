"use client";

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeImages from '@/components/HomeImages';
import CreateBlogButton from '@/components/CreateBlogbutton';
import Category from '@/components/Category';
import PostCard from '@/components/PostCard';
import { useRouter } from 'next/router';
interface Post {
  image: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
}
const CategoryPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const { category } = useParams<{ category: string }>();
  // const params = useParams();
  const router = useRouter();
  const { slug } = router.query;
//   useEffect(() => {
//     if (slug) {
//       fetchData(slug as string);
//     }
//   }, [slug]);

//   const fetchData = async (category: string) => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       const response = await fetch(`http://localhost:5000/api/searchcategory/${category}}`, {
//         // headers: {
//         //   Authorization: Bearer ${accessToken},
//         // },
//       });
//       if (response.status === 401) {
//         throw new Error('Unauthorized: Token not provided');
//       }
//       const data: Post[] = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

  return (
    <>
      <HomeImages />
      <CreateBlogButton />
      <div className="flex dark:bg-gray-800">
        <div>
          <Category />
        </div>
        <div className='sm:px-8 w-full'>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;