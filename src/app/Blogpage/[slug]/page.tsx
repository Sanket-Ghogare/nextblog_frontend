
"use client"
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/router';

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
  // const router = useRouter();
  // const { slug } = router.query;

  // const { id } = useParams<{ id: string }>();


  useEffect(() => {
    const blogdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/`
        );
        if (response.ok) {
          const postdata = await response.json();
          setPost(postdata);
          console.log("postdata", postdata);
        } else {
          toast.error("failed to fetach the post data");
        }
      } catch (error) {
        toast.error("failed to fetch the post data");
      }
    };
    blogdata();
  }, []);

  if (!post ) {
    return <div >Loading...</div>;
  }
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
      <div className="flex float-right mx-8 dark:bg-gray-800">
        <div className="float-right dark:bg-gray-800">
          <p className="mt-5 dark:bg-gray-800">Date: {(post.date)}</p>
        </div>
        {/* <div
          className={`ml-4 w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 ${
            post.author === currentUser ? "" : "hidden"
          } dark:bg-gray-800`}
        >
          <button className="outline-none" onClick={() => Delete(post._id)}>
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
            </svg>
          </button>
        </div> */}
{/* 
        <div
          className={`w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 ${
            post.author === currentUser ? "" : "hidden"
          } dark:bg-gray-800`}
        >
          <Link href={`/update/${post._id}`} className="outline-none">
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
            </svg>
          </Link>
        </div> */}
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
    </div>
  );
};

export default BlogPage;

// src/app/Blogpage/[slug]/page.tsx
// import React from 'react';

// interface Post {
//   image: string;
//   title: string;
//   _id: string;
//   content: string;
//   category: string;
//   date: string;
//   author: string;
// }

// const BlogPage: React.FC<{ post: Post }> = ({ post }) => {
//   if (!post || !post.image) {
//     return <div>Loading...</div>;
//   }
//   const isImage =
 
//     post.image.endsWith(".jpg") ||
//     post.image.endsWith(".jpeg") ||
//     post.image.endsWith(".png");

//   const isVideo =
  
//     post.image.endsWith(".mp4") ||
//     post.image.endsWith(".avi") ||
//     post.image.endsWith(".mov");

//   return (
//     <div className="dark:bg-gray-800">
//       <div className="relative dark:bg-gray-800">
//         {isImage ? (
//           <img className="w-full h-80 dark:bg-gray-800" src={post.image} alt="" />
//         ) : isVideo ? (
//           <video controls className="w-full h-80 dark:bg-gray-800">
//             <source src={post.image} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <img className="w-full h-80 dark:bg-gray-800" src={post.image} alt="" />
//         )}
//       </div>
//       <hr />
//       <div className="flex float-right mx-8 dark:bg-gray-800">
//         <div className="float-right dark:bg-gray-800">
//           <p className="mt-5 dark:bg-gray-800">Date: {(post.date)}</p>
//         </div>
//         {/* <div
//           className={`ml-4 w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 ${
//             post.author === currentUser ? "" : "hidden"
//           } dark:bg-gray-800`}
//         >
//           <button className="outline-none" onClick={() => Delete(post._id)}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 448 512"
//               height={40}
//               width={20}
//             >
//               <path
//                 fill="#e70d0d"
//                 d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
//               />
//             </svg>
//           </button>
//         </div> */}
// {/* 
//         <div
//           className={`w-12 justify-center rounded-lg mt-3 hover:bg-gray-300 cursor-pointer px-3 ${
//             post.author === currentUser ? "" : "hidden"
//           } dark:bg-gray-800`}
//         >
//           <Link href={`/update/${post._id}`} className="outline-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//               height={40}
//               width={20}
//             >
//               <path
//                 fill="#4a10f9"
//                 d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
//               />
//             </svg>
//           </Link>
//         </div> */}
//       </div>

//       <p className="text-gray-500 text-lg text-right mt-20 mr-8 dark:bg-gray-800">
//         Category: {post.category}
//       </p>

//       <p className="text-center font-bold text-4xl uppercase my-7 dark:bg-gray-800 dark:text-white">
//         {post.title}
//       </p>

//       <div>
//         <p className="mx-20 text-2xl font-bold my-2 text-gray-400 dark:bg-gray-800">
//           Author: {post.author}
//         </p>
//       </div>
//       <div className="mx-20 justify-center dark:bg-gray-800">
//         <p className="text-lg dark:bg-gray-800">{post.content}</p>
//       </div>
//     </div>

//   );
// };

// export default BlogPage;