"use client";
import React from "react";

const HomeImages = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
          className="w-full h-96"
          alt="image"
        />
      </div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white ">
        <h1 className="font-bold text-6xl">BLOG</h1>
        <p className="text-2xl text-black bg-white">Explore Your Space</p>
      </div>
    </>
  );
};

export default HomeImages;
