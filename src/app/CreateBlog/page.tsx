"use client";
import React, { FormEvent, useState } from "react";
import { categories } from "@/components/Categories";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    if (!title || !content) {
      setError("Please fill in all the required fields.");
      toast.error("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      // console.log("data", data);
      if (response.status === 404) {
        toast.error("Not found the blog data");
      } else if (response.status !== 200) {
        toast.error("Error while performing the blog operation");
      } else {
        toast.success("Successfully created the blog");
        router.push("/Home");
      }
    } catch (error) {
      toast.error("Error fetching data:");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-700 dark:text-white">
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button
              className="text-white hover:text-gray-300"
              onClick={handleCloseError}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 10.586 8.707 9.293a1 1 0 00-1.414 1.414l1.293 1.293-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293 1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            }
            className="w-full h-64 sm:h-96 lg:h-96 object-cover"
            alt="image"
          />
        </div>

        <div className="mt-4 py-9">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div
                className="mt-3 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer"
                onClick={() => document.getElementById("file_input")?.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 ml-3 mt-1"
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
                <span className="text-xs text-center text-gray-400 mt-2 mx-2">
                  Select Here
                </span>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              {/* 
            <div className="mt-3 sm:ml-4">
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="block w-full sm:w-64 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              >
                <option value="">Select Your Blog Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div> */}
              <button
                type="submit"
                className="mt-3 sm:mt-0 sm:ml-4 bg-blue-500 px-6 py-1 text-white rounded-md uppercase"
              >
                {isLoading ? "Publishing..." : "Publish blog"}
              </button>
            </div>

            <div className="mt-6 ml-32">
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full outline-none text-2xl sm:text-3xl dark:bg-gray-700 dark:text-white"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="mt-4 ml-48">
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none rounded-md p-2 focus:outline-none w-full text-xl sm:text-2xl dark:bg-gray-700 dark:text-white"
                placeholder="Tell your story... "
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
