// 'use client'

// import BlogPage from "@/app/Blogpage/[slug]/page";
// import { GetServerSidePropsContext } from 'next';

// // pages/Blogpage/[slug].tsx
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { slug } = context.params;

//   try {
//     const response = await fetch(`http://localhost:5000/api/categories/${slug}`);
//     if (response.ok) {
//       const post = await response.json();
//       return {
//         props: {
//           post,
//         },
//       };
//     } else {
//       return {
//         props: {
//           error: 'Failed to fetch post data',
//         },
//       };
//     }
//   } catch (error) {
//     return {
//       props: {
//         error: 'Failed to fetch post data',
//       },
//     };
//   }
// }

// const BlogPageWrapper = (props:any) => {
//   if (props.error) {
//     return <div>Error: {props.error}</div>;
//   }

//   return <BlogPage post={props.post} />;
// };

// export default BlogPageWrapper;