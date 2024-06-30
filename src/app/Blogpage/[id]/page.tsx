"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

interface Post {
  image: string;
  title: string;
  _id: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

interface Comment {
  _id: string;
  username: string;
  postid: string;
  comments: string;
  date: string;
}

const BlogPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "";
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [curretUser, setCurrentUser] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setCurrentUser(storedUsername);
    }
  }, []);
  useEffect(() => {
    if (!params || !params.id) {
      toast.error("Invalid post ID");
      return;
    }

    const blogdata = async () => {
      try {
        // const username = localStorage.getItem("username");
        // setCurrentUser(username);
        const response = await fetch(
          `http://localhost:5000/api/categories/${params.id}`
        );
        if (response.ok) {
          const postdata = await response.json();
          setPost(postdata);
          // console.log("postdata", postdata);
        } else {
          toast.error("Failed to fetch the post data");
        }
      } catch (error) {
        toast.error("Failed to fetch the post data");
      }
    };

    blogdata();

    const fetchcomment = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comments1");
        if (!response.ok) {
          throw new Error("Failed to fetch comment data");
        }
        const comment = await response.json();
        setComments(
          comment.filter((comment: Comment) => comment.postid === params.id)
        );
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    };
    fetchcomment();
  }, [params,comments]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const deletepost = async () => {
    try {
      // const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/delete/${post._id}`,
        {
          method: "DELETE",
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );
      if (response.ok) {
        const postdata = await response.json();
        // console.log("postdata", postdata);
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

  const handleEdit = () => {
    router.push(`/edit/${post._id}`);
  };

  const CreateComment = async () => {
    try {
      const username = localStorage.getItem("username");
      // const username = localStorage.getItem("username");
      const postId = post._id;
      // console.log("username", username);
      const requestBody = {
        username: username,
        postid: postId.toString(),
        comments: newComment,
      };
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("Request Body:", requestBody);

      if (!response.ok) {
        throw new Error("Network response was not good");
      }
      setNewComment("");
    } catch (error) {
      toast.error("error for comment ");
    }
  };
  // show comments

  // update
  async function updateComment(
    id: string,
    name: string,
    postid: string,
    comments: string
  ) {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, postid, comments }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const updatedComment = await response.json();
      return updatedComment;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }

  // delete comments
  async function deleteComment(id: string) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      const { message } = await response.json();
      return message;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  // update comments

  return (
    <div className="dark:bg-gray-800">
      <div className="relative dark:bg-gray-800">
        {isImage ? (
          <img
            className="w-full h-80 dark:bg-gray-800"
            src={post.image}
            alt=""
          />
        ) : isVideo ? (
          <video controls className="w-full h-80 dark:bg-gray-800">
            <source src={post.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            className="w-full h-80 dark:bg-gray-800"
            src={post.image}
            alt=""
          />
        )}
      </div>
      <hr />
      <div className="flex float-right mx-8 dark:bg-gray-800 dark:text-white">
        <div className="float-right dark:bg-gray-800">
          <p className="mt-5 dark:bg-gray-800">Date: {post.date}</p>
        </div>
        <div
          className={`ml-4 w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 dark:bg-gray-800  dark:text-white`}
        >
          <button onClick={deletepost} className="outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height={40}
              width={20}
            >
              <path
                fill="#e70d0d"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>{" "}
          </button>
        </div>

        <div
          onClick={handleEdit}
          className={`w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3  dark:bg-gray-800  dark:text-white`}
        >
          <Link href={`/edit/${post._id}`} className="outline-none ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height={40}
              width={20}
            >
              <path
                fill="#4a10f9"
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>{" "}
          </Link>
        </div>
      </div>

      <p className="text-gray-500 text-lg text-right mt-20 mr-8 dark:bg-gray-800  dark:text-white">
        Category: {post.category}
      </p>

      <p className="text-center font-bold text-4xl uppercase my-7 dark:bg-gray-800 dark:text-white">
        {post.title}
      </p>

      <div>
        <p className="mx-16 text-2xl font-bold my-2 dark:bg-gray-800  dark:text-white">
          Author: {post.author}
        </p>
      </div>
      <div className="mx-20 justify-center dark:bg-gray-800">
        <p className="text-lg dark:bg-gray-800  dark:text-white">
          {post.content}
        </p>
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
              onClick={CreateComment}
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
              <button
                className={`float-right ${
                  comment.username === curretUser ? "" : "hidden"
                }`}
                onClick={() => deleteComment(comment._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={35}
                  height={15}
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>

              {/* <button
                className={`float-right ${
                  comment.username === curretUser ? "" : "hidden"
                }`}
                onClick={() => updateComment(
                  comment._id,
                  comment.username,
                  comment.postid,
                  comment.comments
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button> */}

              <div className="flex  space-x-6  dark:bg-gray-800  ">
                <div className="flex  dark:bg-gray-800 ">
                  <div className="mt-2 ml-4  dark:bg-gray-800 ">
                    <Link href={`/edit/${post._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </Link>
                  </div>
                  <div className=" dark:bg-gray-800 ">
                    <p className="font-bold text-lg ml-2 dark:text-gray-400">
                      {comment.username}
                    </p>
                  </div>
                </div>
                <p className=" text-gray-400 dark:text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </div>

              <p className="ml-8 dark:text-gray-400">{comment.comments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
