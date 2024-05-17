"use client";

// import React from "react";

// import HomeImages from "@/components/HomeImages";
// import Category from "../../components/Category";
// import CreateBlogButton from "@/components/CreateBlogbutton";
// import CreatePost from "@/components/CreatePost";

// const Home = () => {
//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-700 dark:text-white">
//       <HomeImages />
//       <div className="flex flex-col sm:flex-row items-start justify-between">
//         <div className="w-full sm:w-1/4 mr-4">
//           <Category />
//         </div>
//         <div className="w-full sm:w-3/4 mt-4 sm:mt-0">
//           <CreateBlogButton />
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//             <div className="relative">
//               <img
//                 src="https://picsum.photos/id/1/300/200"
//                 alt="Blog Image 1"
//                 className="w-full h-48 object-cover rounded-md"
//               />
//             </div>
//             <div className="relative">
//               <img
//                 src="https://picsum.photos/id/2/300/200"
//                 alt="Blog Image 2"
//                 className="w-full h-48 object-cover rounded-md"
//               />
//             </div>
//             <div className="relative">
//               <img
//                 src="https://picsum.photos/id/3/300/200"
//                 alt="Blog Image 3"
//                 className="w-full h-48 object-cover rounded-md"
//               />
//             </div>
//           </div>
//           <CreatePost />
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react'

import HomeImages from '@/components/HomeImages';
import Category from "../../components/Category";
import CreateBlogButton from '@/components/CreateBlogbutton';
import CreatePost from '@/components/CreatePost';


const Home=()=>{
  return (
     <>
    <HomeImages/>

    <CreateBlogButton/>
    <div className="flex  dark:bg-gray-700 dark:text-white">
    <div>
  <Category/>
  </div>
  <div className="mt-0 ml-4 ">
   <CreatePost/>
  </div>
  </div>
     </>
  );
} 

export default Home
