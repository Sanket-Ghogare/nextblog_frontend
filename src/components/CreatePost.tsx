"use client";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import toast from "react-hot-toast";

interface Post {
  image: string;
  title: string;
  _id: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

const CreatePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    blogData();
  }, []);

  const blogData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "GET",
      });
      if (response.status === 404) {
        toast.error("Not found the blog data");
      } else if (response.status !== 200) {
        toast.error("Error while performing the blog operation");
      } else {
        toast.success("Successfully fetch the blog");
      }
      const data: Post[] = await response.json();
      setPosts(data);
      console.log("data", data);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default CreatePost;