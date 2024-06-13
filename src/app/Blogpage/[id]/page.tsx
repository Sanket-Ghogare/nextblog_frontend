"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from 'next/link';
import { useRouter } from "next/navigation";
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
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const params = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
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

  const deletepost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/${post._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const postdata = await response.json();
        console.log("postdata", postdata);
       router.push("/Home");

      } else {
        toast.error("Failed to delete data");
      }
    } catch (error) {
      toast.error("Failed to delete data");
    }
  };
  const isImage =
    post.image.endsWith(".jpg") ||
    post.image.endsWith(".jpeg") ||
    post.image.endsWith(".png");
  const isVideo =
    post.image.endsWith(".mp4") ||
    post.image.endsWith(".avi") ||
    post.image.endsWith(".mov");

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


        <div className={`ml-4 w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 dark:bg-gray-800 `}>
    <button 
    onClick={deletepost} className='outline-none'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={40} width={20}><path fill="#e70d0d" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>  </button>
     </div>
     
     <div className={`w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3  dark:bg-gray-800`}>
    <Link href={`/Updateblog/${post._id}`} className='outline-none ' >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={40} width={20}><path fill="#4a10f9" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>  </Link> 
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
      <div className="border  border-gray-300 mt-10 bg-gray-50  dark:bg-gray-800 ">
        <div className="flex justify-center w-full space-x-2  mt-20 pl-12  dark:bg-gray-800   ">
          <div className="sm:h-1/2 rounded-full ss:h-1/3   dark:bg-gray-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
          <div className="space-x-4  w-full  flex  dark:bg-gray-800 ">
            <textarea
              name="comments"
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              className=" w-10/12 sm:p-4 ss:p-3 text-lg  dark:bg-gray-800 "
              placeholder="comment Here... "
            ></textarea>
            <button
              // onClick={HandleComment}
              className=" bg-blue-500 rounded-md px-6  h-10 text-white"
            >
              Post
            </button>
          </div>
        </div>

        <div className="mx-10 mt-3 pr-3  dark:bg-gray-800 dark:rounded-md dark:mb-5">
          {comments.map((comment, index) => (
            <div
              key={index}
              className=" bg-gray-200 w-full my-3 py-3 rounded-md dark:border border-gray-400  dark:bg-gray-800 "
            >
              {/* <button
                className={`float-right ${
                  // comment.name === currentUser ? "" : "hidden"
                }`
              }
                // onClick={}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={35}
                  height={15}
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button> */}

              <div className="flex  space-x-6  dark:bg-gray-800  ">
                <div className="flex  dark:bg-gray-800 ">
                  <div className="mt-2 ml-4  dark:bg-gray-800 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                  </div>
                  <div className=" dark:bg-gray-800 ">
                    {/* <p className="font-bold text-lg ml-2 dark:text-gray-400">
                      {comment.name}{" "}
                    </p> */}
                  </div>
                </div>
                <p className=" text-gray-400 dark:text-gray-500">
                  {/* {formatDate(comment.date)} */}
                </p>
              </div>

              {/* <p className="ml-8 dark:text-gray-400">{comment.comments}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;