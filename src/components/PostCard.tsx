"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Postcard {
  image: string;
  title: string;
  _id: string;
  content: string;
  category: string;
  date: string;
}
interface PostCardProps {
  post: Postcard;
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const isImage =
    post.image.endsWith(".jpg") ||
    post.image.endsWith(".jpeg") ||
    post.image.endsWith(".png") ||
    post.image.endsWith(".gif") ||
    post.image.endsWith(".bmp") ||
    post.image.endsWith(".webp");
  const isVideo =
    post.image.endsWith(".mp4") ||
    post.image.endsWith(".avi") ||
    post.image.endsWith(".mpv") ||
    post.image.endsWith(".mov") ||
    post.image.endsWith(".mkv");
  return (
    <div className="sm:w-full sm:p-1 ss:p-2 sm:h-96 dark:bg-gray-800 ss:w-77 ss:h-80">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">

        <Link href={`/Blogpage/${post._id}`} className="flex-grow">
          {isImage ? (
            <Image
              className="rounded-t-lg w-full h-40 object-cover"
              src={post.image}
              alt=""
              width={1040}
              height={460}
            />
          ) : isVideo ? (
            <video controls className="rounded-t-lg w-full h-40 object-cover">
              <source src={post.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              className="rounded-t-lg w-full object-cover h-40"
              src={post.image}
              alt=""
              width={1040}
              height={460}
            />
          )}
        </Link>
       
        <p className="text-center mt-2 text-sm text-gray-400">
          {post.category}
        </p>
        <div className="p-2 flex-grow">
          <p className="text-center text-xl font-bold truncate dark:text-white">
            {post.title}
          </p>
          {/* <p className="text-center text-sm text-gray-400">{post.author}</p> */}
          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
