"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
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

const UpdateBlogPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>({
    image: "",
    title: "",
    _id: "",
    content: "",
    category: "",
    date: "",
    author: "",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (!params || !params.id) {
      toast.error("Invalid post ID");
      return;
    }
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${params.id}`
        );
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setImage(postData.image);
        } else {
          throw new Error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [params]);

  if (!post) {
    return <div>Loading...</div>;
  }
  // const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('title', title);
  //     formData.append('content', content);
  //     if (image instanceof File) {
  //       formData.append('image', image);
  //     }
  //     setLoading(true);
  
  //     const response = await fetch(`http://localhost:5000/api/update/${post._id}`, {
  //       method: 'PUT',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       router.push('/Home');
  //     } else {
  //       throw new Error('Failed to update post');
  //     }
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //     alert("File Size is too large it should be less than 5MB ");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params || !params.id) {
      toast.error("Invalid post ID");
      return;
    }
    try {
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('content', content);
      // if (image instanceof File) {
      //   // Check if the file size is less than 5MB
      //   if (image.size > 5 * 1024 * 1024) {
      //     alert('File size is too large. It should be less than 5MB.');
      //     return;
      //   }
      //   formData.append('image', image);
      // }
      // setLoading(true);
      const updatedPost = {
        title,
        content,
        image,
      };
  

      const response = await fetch(`http://localhost:5000/api/update/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        router.push('/Home');
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-800 dark:h-screen">
      <div className="relative dark:bg-gray-800">
        {image &&
          (typeof image === "string" ? (
            image.endsWith(".mp4") ? (
              <video src={image} controls className="w-full h-96"></video>
            ) : (
              <img
                src={image}
                alt="Current Blog Media"
                className="w-full h-96"
              />
            )
          ) : image.type.startsWith("video/") ? (
            <video
              src={URL.createObjectURL(image)}
              controls
              className="w-full h-96"
            ></video>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="Current Blog Media"
              className="w-full h-96"
            />
          ))}
      </div>
      <div>
        <form onSubmit={handleUpdate}>
          <div className="flex w-full dark:bg-gray-800 ">
            <div
              className="mt-3 w-full flex dark:bg-gray-800 "
              onClick={() => document.getElementById("file_input")?.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="w-full mt-2  dark:bg-gray-800 ">
                <span className="text-sm text-center  text-gray-400  mt-6  dark:bg-gray-800 dark:text-white">
                  Upload
                </span>
              </div>
              <input
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className={`mx-4 float-right bg-blue-500 px-6 my-3 py-1  text-white rounded-md uppercase ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              } `}
            >
              {isLoading ? "Updateing..." : "Update"}
            </button>
          </div>
          <div className="pl-10 dark:bg-gray-800">
            <input
              name="title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 ml-1 outline-none text-2xl dark:bg-gray-800 dark:text-white"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="my-3 mx-6">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none rounded-md p-2 focus:outline-none w-full text-xl dark:text-gray-400 dark:bg-gray-800"
              placeholder="Tell your story... "
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
