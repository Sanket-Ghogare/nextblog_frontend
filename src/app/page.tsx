"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster, ToastBar } from "react-hot-toast";

// interface Details {
//   username: string;
//   password: string;
// }

export const Login = () => {
  const [Details, setDetails] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...Details, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = Details;
    try {
      // const accessToken = localStorage.getItem('accessToken');
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization : `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ username, password }),
      });
      // console.log('acesstoken',accessToken);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
        localStorage.setItem("username", data.username);

        // console.log("accesstoken", data.accessToken);

        const toastId = toast.success("User logged in successfully", {
          duration: 3000, // 3 seconds
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
        alert("User logged in successfully");
        router.push("/Home");
        // console.log("data", data);
      } else {
        toast.error("Error while fetching the data");
        alert("Error while fetching the data");
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert("invalid email or password");
      toast.error("error while fetch the data");
      console.log("LOgin error ", error);
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          className: "my-toast",
          style: {
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              background: t.visible ? "#333" : "",
              padding: "16px",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            {({ icon, message }) => (
              <>
                {icon}
                {message}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-6xl font-extrabold">Sign In</h1>
              <div className="w-full flex-1 mt-1">
                <div className="flex flex-col items-center"></div>

                <div className="my-3 border-b text-center"></div>
                <form onSubmit={handlesubmit}>
                  <div className="mx-auto max-w-xs">
                    <input
                      onChange={handleChange}
                      name="username"
                      className="w-full mt-12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-3"
                      type="username"
                      placeholder="Username"
                      value={Details.username}
                    />
                    <input
                      onChange={handleChange}
                      name="password"
                      className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-6"
                      type="password"
                      placeholder="Password"
                      value={Details.password}
                    />
                    <button
                      type="submit"
                      className="mt-8 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                      <span className="ml-3">Sign In</span>
                    </button>
                    <p className="mt-6 text-sm text-gray-600 text-center">
                      I agree the&nbsp;
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Terms of Service
                      </a>
                      &nbsp;and its&nbsp;
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </a>
                    </p>
                    <p className=" text-base text-center mt-2">
                      Dont have an account?{" "}
                      <Link href="/signup" className=" text-blue-600 underline">
                        Create Here
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

export default Login;
