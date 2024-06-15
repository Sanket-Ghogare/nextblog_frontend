
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface Post {
  image: string;
  title: string;
  _id: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

const BlogPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!params || !params.id) {
      toast.error("Invalid post ID");
      return;
    }

    const blogdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${params.id}`
        );
        if (response.ok) {
          const postdata = await response.json();
          setPost(postdata);
          console.log("postdata", postdata);
        } else {
          toast.error("Failed to fetch the post data");
        }
      } catch (error) {
        toast.error("Failed to fetch the post data");
      }
    };

    blogdata();
  }, [params]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const isImage =
    post.image.endsWith(".jpg") ||
    post.image.endsWith(".jpeg") ||
    post.image.endsWith(".png");
  const isVideo =
    post.image.endsWith(".mp4") ||
    post.image.endsWith(".avi") ||
    post.image.endsWith(".mov");


    const handleEdit = () => {
      router.push(`/edit/${post._id}`);
    };
  return (
    <div className="dark:bg-gray-800">
      <div className="relative dark:bg-gray-800">
        {isImage ? (
          <img className="w-full h-80 dark:bg-gray-800" src={post.image} alt="" />
        ) : isVideo ? (
          <video controls className="w-full h-80 dark:bg-gray-800">
            <source src={post.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img className="w-full h-80 dark:bg-gray-800" src={post.image} alt="" />
        )}
      </div>
      <hr />
      <div className="flex float-right mx-8 dark:bg-gray-800">
        <div className="float-right dark:bg-gray-800">
          <p className="mt-5 dark:bg-gray-800">Date: {post.date}</p>
        </div>
      </div>

      <p className="text-gray-500 text-lg text-right mt-20 mr-8 dark:bg-gray-800">
        Category: {post.category}
      </p>

      <p className="text-center font-bold text-4xl uppercase my-7 dark:bg-gray-800 dark:text-white">
        {post.title}
      </p>

      <div>
        <p className="mx-20 text-2xl font-bold my-2 text-gray-400 dark:bg-gray-800">
          Author: {post.author}
        </p>
      </div>
      <div className="mx-20 justify-center dark:bg-gray-800">
        <p className="text-lg dark:bg-gray-800">{post.content}</p>
      </div>

      <div className="text-center my-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
