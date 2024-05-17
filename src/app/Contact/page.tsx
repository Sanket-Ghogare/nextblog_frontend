import React from "react";

const Contact = () => {
  const email = "sanketvghogare@gmail.com";

  return (
    <div className="dark:bg-gray-700 dark:text-white w-screen">
      <div className="relative">
        <img
          src="http://mrtaba.ir/image/bg2.jpg"
          className='w-full h-[30rem] sm:h-[40rem] md:h-[50rem] lg:h-[40rem] dark:bg-gray-700 dark:text-white'
          alt="image"
        />
      </div>

      <h1 className="text-center font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-7">
        Contact Us
      </h1>
      <div className="flex flex-col sm:flex-row mt-12 mx-4 sm:mx-8 justify-center items-center">
        <p className="flex text-xl sm:text-2xl text-center mt-5 font-bold">
          You can reach us via email at{" "}
        </p>
        <a href={`mailto:${email}`}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
            className="w-16 h-16 sm:w-20 sm:h-20 ml-2 mt-2 sm:mt-0"
            alt="image"
          />
        </a>
      </div>
    </div>
  );
};

export default Contact;