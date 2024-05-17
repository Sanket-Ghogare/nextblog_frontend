import React from 'react'

const About = () => {
  return (
    <div className='dark:bg-gray-700 dark:text-white'>
      <div className='relative dark:bg-gray-700 dark:text-white'>
        <img
          src="https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg"
          className='w-full h-[30rem] sm:h-[40rem] md:h-[50rem] lg:h-[40rem] dark:bg-gray-700 dark:text-white'
          alt="image"
        />
      </div>

      <h6 className='text-center dark:bg-gray-700 dark:text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-6'>About Our Website</h6>

      <p className='mx-4 sm:mx-8 md:mx-12 lg:mx-16 dark:bg-gray-700 dark:text-white text-justify sm:text-left mt-4 sm:mt-6 md:mt-8 lg:mt-10'>
        In this blogging application, I've implemented a robust authentication system that ensures only authorized users can perform specific actions, with each blog post associated with its creator for exclusive editing and deletion rights. Comments are tied to individual users, granting them control over their contributions, and an admin dashboard provides privileged access to manage the platform, including the ability to delete any blog post if necessary. Advanced security measures, such as encryption protocols and regular audits, safeguard user data, while seamless integration with social media networks enhances user reach and community interaction. Collaborative editing and group discussions foster teamwork and idea-sharing, complemented by user-driven updates and feedback-driven improvements. To maintain content quality, spam combat measures and moderation tools are in place, ensuring a secure, collaborative, and enriching blogging experience for all users.
      </p>
    </div>
  )
}

export default About