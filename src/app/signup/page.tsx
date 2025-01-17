'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";


export const SignUp = () => {
    const router = useRouter();
  const [fromData, setFromdata] = useState({
    username: "",
    email: "",
    password: "",
  });

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      setFromdata({...fromData ,[e.target.name]:e.target.value});
    }
  
    const handlesubmit = async (e: FormEvent) => {
      e.preventDefault();
      const  {username, email, password} = fromData;
      try {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username,email, password}),
        });
  
        if (!response.ok) {
          console.error(`Error:${response.status}`);
        }
  
        const data = await response.json();
        router.push("/");
        console.log("data",data);
  
      } catch (error) {
          console.log("LOgin error ", error);
          alert("error");
      }
    };
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center mt-0">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-3xl xl:text-6xl font-extrabold">Sign Up</h1>
              <div className="w-full flex-1 mt-4">
                <div className="flex flex-col items-center"></div>
                <form onSubmit={handlesubmit}>
                  <div className="mx-auto max-w-xs">
                    <input onChange={handleChange}
                      name="username"
                      className="w-full mt-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-3"
                      type="username"
                      placeholder="Username"
                    />
                    <input onChange={handleChange}
                      name="email"
                      className="w-full mt-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <input onChange={handleChange}
                      name="password"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                    />
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-6 text-sm text-gray-600 text-center">
                      I agree to
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        &nbsp;Terms of Service&nbsp;
                      </a>
                      and its&nbsp;
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </a>
                    </p>
                    <p className=" text-base text-center mt-2">
                      Already have an account?{" "}
                      <Link href="/" className=" text-blue-600 underline">
                        Login Here
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-1 xl:m-6 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
