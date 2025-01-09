import React, { useState } from 'react';
import { 
 CalendarIcon, 
 UserCircleIcon, 
 ChatBubbleLeftIcon,
 ArrowLongRightIcon }
 from '@heroicons/react/24/outline';
const Blog = () => {
 const [blogs] = useState([
   {
     id: 1,
     title: "The Future of Global Shipping and Logistics",
     excerpt: "Discover how technology and sustainability are reshaping the shipping industry...",
     image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
     author: "John Smith",
     date: "March 15, 2024",
     category: "Industry Trends",
     comments: 12,
     readTime: "5 min read"
   },
   {
     id: 2,
     title: "Sustainable Shipping: A Green Revolution",
     excerpt: "Exploring eco-friendly practices in modern maritime transportation...",
     image: "https://www.tunley-environmental.com/hubfs/Green%20Shipping%20Corridors%202.jpg",
     author: "Sarah Johnson",
     date: "March 12, 2024",
     category: "Sustainability",
     comments: 8,
     readTime: "4 min read"
   },
   {
     id: 3,
     title: "Digital Transformation in Logistics",
     excerpt: "How AI and blockchain are revolutionizing supply chain management...",
     image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
     author: "Mike Wilson",
     date: "March 10, 2024",
     category: "Technology",
     comments: 15,
     readTime: "6 min read"
   },
 ]);
  const categories = [
   "All Posts",
   "Industry Trends",
   "Technology",
   "Sustainability",
   "Supply Chain",
   "Maritime News"
 ];
  return (
   <div className="mb-[30px] translate-y-[-50px]  pt-24 pb-12">
     {/* Hero Section */}
     <div className="bg-blue-700 text-white py-12 mb-12">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center">
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
             Our Latest Insights & News
           </h1>
           <p className="text-blue-100 text-lg max-w-2xl mx-auto">
             Stay updated with the latest trends and insights in the shipping and logistics industry
           </p>
         </div>
       </div>
     </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* Categories */}
       <div className="flex flex-wrap gap-2 mb-12 justify-center">
         {categories.map((category) => (
           <button
             key={category}
             className="px-4 py-2 rounded-full text-sm font-medium 
                      bg-white shadow-sm hover:shadow-md transition-shadow
                      border border-gray-200 text-gray-700 hover:bg-gray-50"
           >
             {category}
           </button>
         ))}
       </div>
        {/* Blog Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {blogs.map((blog) => (
           <article 
             key={blog.id}
             className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
           >
             {/* Image */}
             <div className="aspect-w-16 aspect-h-9">
               <img
                 src={blog.image}
                 alt={blog.title}
                 className="w-full h-48 object-cover"
               />
             </div>
              {/* Content */}
             <div className="p-6">
               {/* Category */}
               <div className="text-sm font-medium text-blue-600 mb-2">
                 {blog.category}
               </div>
                {/* Title */}
               <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                 {blog.title}
               </h2>
                {/* Excerpt */}
               <p className="text-gray-600 mb-4 line-clamp-2">
                 {blog.excerpt}
               </p>
                {/* Meta information */}
               <div className="flex items-center text-sm text-gray-500 mb-4">
                 <UserCircleIcon className="h-5 w-5 mr-1" />
                 <span className="mr-4">{blog.author}</span>
                 <CalendarIcon className="h-5 w-5 mr-1" />
                 <span className="mr-4">{blog.date}</span>
                 <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                 <span>{blog.comments}</span>
               </div>
                {/* Read More Link */}
               <div className="flex items-center text-blue-600 font-medium hover:text-blue-700">
                 Read More
                 <ArrowLongRightIcon className="h-5 w-5 ml-1" />
               </div>
             </div>
           </article>
         ))}
       </div>
        {/* Newsletter Section */}
       <div className="mt-16 bg-gray-900 rounded-2xl p-8 sm:p-12">
         <div className="max-w-2xl mx-auto text-center">
           <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
             Subscribe to Our Newsletter
           </h2>
           <p className="text-gray-300 mb-6">
             Get the latest insights and news delivered to your inbox
           </p>
           <form className="flex flex-col sm:flex-row gap-3">
             <input
               type="email"
               placeholder="Enter your email"
               className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
             />
             <button
               type="submit"
               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                        hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
             >
               Subscribe
             </button>
           </form>
         </div>
       </div>
        {/* Pagination */}
       <div className="mt-12 flex justify-center">
         <nav className="flex items-center gap-2">
           <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
             Previous
           </button>
           {[1, 2, 3].map((page) => (
             <button
               key={page}
               className={`w-10 h-10 rounded-lg flex items-center justify-center
                         ${page === 1 
                           ? 'bg-blue-600 text-white' 
                           : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                         }`}
             >
               {page}
             </button>
           ))}
           <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
             Next
           </button>
         </nav>
       </div>
     </div>
   </div>
 )}

export default Blog