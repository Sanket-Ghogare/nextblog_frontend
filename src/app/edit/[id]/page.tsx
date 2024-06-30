"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

const EditBlogPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | string | null>(null);
  const params = useParams();
  const router = useRouter();


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
          const postdata = await response.json();
          setPost(postdata);
          setTitle(postdata.title);
          setContent(postdata.content);
          setImage(postdata.image);
        } else {
          toast.error("Failed to fetch the post data");
        }
      } catch (error) {
        toast.error("Failed to fetch the post data");
      }
    };

    fetchPost();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image instanceof File) {
        formData.append('image', image);
      }
  
      // const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/update/${post._id}`, {
        method: "PUT",
        body: formData, // No need to specify headers for FormData
        // headers:{
        //   Authorization:`Bearer ${accessToken}`,
        // }

      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        toast.success("Post updated successfully");
        router.push('/Home');
      } else {
        toast.error("Failed to update the post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the post");
    } finally {
      setLoading(false);
    }
  };
  

 

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dark:bg-gray-800 dark:h-screen'>
    <div className='relative dark:bg-gray-800' >
      {image && (
        typeof image === 'string' ? (
          image.endsWith('.mp4') ? (
            <video src={image} controls className="w-full h-96"></video>
          ) : (
            <img src={image} alt="Current Blog Media" className="w-full h-96" />
          )
        ) : (
          image.type.startsWith('video/') ? (
            <video src={URL.createObjectURL(image)} controls className="w-full h-96"></video>
          ) : (
            <img src={URL.createObjectURL(image)} alt="Current Blog Media" className="w-full h-96" />
          )
        )
      )}
    </div>
    <div>
            <form onSubmit={handleSubmit}>
              <div className='flex w-full dark:bg-gray-800'>
                <div className='mt-3 w-full flex dark:bg-gray-800' onClick={() => document.getElementById('file_input')?.click()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <input className="w-full dark:bg-gray-800 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 hidden" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleFileChange} />
    
                </div>
                
                <button type='submit' className={`mx-4  bg-blue-500 px-6 my-3 py-1 float-right text-white rounded-md uppercase `}>
                  {loading? 'Updateing...' :'Update'}
                </button>
    
              </div>
              <div className='pl-10 dark:bg-gray-800' >
                <input name="title " value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mt-2 ml-1 outline-none text-2xl dark:bg-gray-800 dark:text-white' type="text" placeholder='Title' />
              </div>
              <div className='my-3 mx-6  dark:text-white'>
                <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} className="resize-none rounded-md p-2 focus:outline-none w-full text-xl dark:bg-gray-800" placeholder='Tell your story... '></textarea>
              </div>
            </form>
          </div>
        </div>
  );
};

export default EditBlogPage;
