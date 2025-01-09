import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const OurServices = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="mt-[-120px]">
      <h1 className="text-center text-3xl sm:text-4xl text-black font-bold mb-6">
        Our Services
      </h1>

      <div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto py-10">
        {/* Land Transport Card */}
        <motion.div
          whileHover={{ y: -40 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative border rounded-lg shadow-md bg-white flex flex-col justify-end items-center p-4 hover:shadow-lg transition-shadow overflow-hidden h-80"
        >
          <img
            src="https://delmashipping.com/wp-content/uploads/2016/11/The-Different-Modes-of-Transportation-Header-e1645547707423-1170x658.jpg"
            alt="Land Transport"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white translate-y-[-30px] px-2">
            <h1 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Land Transport
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed sm:px-4 line-clamp-4 sm:line-clamp-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              dolorum autem laudantium. Quidem illo culpa quia, laboriosam amet
              eveniet nihil.
            </p>
            <button
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  navigate("/profile");
                }
              }}
              className="mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Make Shippment
            </button>
          </div>
        </motion.div>

        {/* Sea Transport Card */}
        <motion.div
          whileHover={{ y: -40 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative border rounded-lg shadow-md bg-white flex flex-col justify-end items-center p-4 hover:shadow-lg transition-shadow overflow-hidden h-80"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/MAERSK_MC_KINNEY_M%C3%96LLER_%26_MARSEILLE_MAERSK_%2848694054418%29.jpg/1200px-MAERSK_MC_KINNEY_M%C3%96LLER_%26_MARSEILLE_MAERSK_%2848694054418%29.jpg"
            alt="Sea Transport"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white translate-y-[-30px] px-2">
            <h1 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Sea Transport
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed sm:px-4 line-clamp-4 sm:line-clamp-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              dolorum autem laudantium. Quidem illo culpa quia, laboriosam amet
              eveniet nihil.
            </p>
            <button
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  navigate("/profile");
                }
              }}
              className="mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Make Shippment
            </button>
          </div>
        </motion.div>

        {/* Air Transport Card */}
        <motion.div
          whileHover={{ y: -40 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative border rounded-lg shadow-md bg-white flex flex-col justify-end items-center p-4 hover:shadow-lg transition-shadow overflow-hidden h-80"
        >
          <img
            src="https://media.licdn.com/dms/image/D4D12AQGb0in3IjKRuQ/article-cover_image-shrink_720_1280/0/1685118761581?e=2147483647&v=beta&t=8qMHyyIUUHcW01czQnHRn0L7vmGq28Z96tUcTTtTa8U"
            alt="Air Transport"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white translate-y-[-30px] px-2">
            <h1 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Air Transport
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed sm:px-4 line-clamp-4 sm:line-clamp-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              dolorum autem laudantium. Quidem illo culpa quia, laboriosam amet
              eveniet nihil.
            </p>
            <button
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  navigate("/profile");
                }
              }}
              className="mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Make Shippment
            </button>
          </div>
        </motion.div>

        {/* Local Transport Card */}
        <motion.div
          whileHover={{ y: -40 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative border rounded-lg shadow-md bg-white flex flex-col justify-end items-center p-4 hover:shadow-lg transition-shadow overflow-hidden h-80"
        >
          <img
            src="https://vmn-bike-eu.imgix.net/2022/12/bike-europe-zoomo-ebike-delivery-predictions-1.jpg?auto=compress%2Cformat&q=50"
            alt="Local Transport"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white translate-y-[-30px] px-2">
            <h1 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Local Transport
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed sm:px-4 line-clamp-4 sm:line-clamp-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              dolorum autem laudantium. Quidem illo culpa quia, laboriosam amet
              eveniet nihil.
            </p>
            <button
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  navigate("/profile");
                }
              }}
              className="mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Make Shippment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
