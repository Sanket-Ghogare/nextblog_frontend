'use client';

import React, { useState, useEffect } from "react";
import { categories } from './Categories';
import Link from 'next/link'

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  

  
 

  const handleCategoryClick = (categoryType: string) => {
    setSelectedCategory(categoryType);
  };

  return (
    <>
      <div>
        <div className="underline text-blue-700 flex  dark:bg-gray-700 dark:text-white">
          <table>
            {/* <thead>
              <tr>
                <td className="mt-10 py-3 px-10 border border-gray-300">
                  <Link href="/Home" className=" cursor-pointer">
                    {" "}
                    All Categories
                  </Link>
                </td>
              </tr>
            </thead> */}

            <tbody >
            {
                categories.map(category=>(
                    <tr key={category.id} >
                     <td  className='py-3 px-16 mb-4  border border-gray-300  dark:bg-gray-700 dark:text-white' >
                        <Link href={`/${category.type}`} 
                         className={`cursor-pointer ${selectedCategory === category.type ? 'font-bold' : ''}`}
                         onClick={()=>handleCategoryClick(category.type)}
                         >
                            {category.type}
                            </Link>
                     </td>
                    </tr>
                ))
            }
        </tbody>
          </table>
        </div>
{/* 
        <div className=" w-full mt-2">
          <Link href="/admin/home">
            <button className=" bg-blue-600 uppercase text-white ml-3 my-3 px-10 py-1 rounded-md">
              Admin
            </button>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default Category;
