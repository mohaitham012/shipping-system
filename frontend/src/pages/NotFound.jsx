import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import animation from '../../public/assets/Animation - 1734717980816.json';
const NotFound = () => {
 return (
   <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 translate-y-[-80px]">
     {/* Animation Container */}
     <div className="w-full max-w-lg mx-auto">
       <Lottie
         animationData={animation}
         loop={true}
         autoPlay={true}
         className="w-full h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px]"
       />
     </div>
      {/* Button Container */}
     <div className="mt-8 sm:mt-12">
       <Link to="/">
         <button className="px-6 py-3 text-base sm:text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg">
           Back To Home
         </button>
       </Link>
     </div>
   </div>
 )}

export default NotFound;