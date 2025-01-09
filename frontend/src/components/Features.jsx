import React from "react";
import { FaTruck } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const Features = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-black text-center lg:translate-y-[-20px]">
        Our Features
      </h1>

      {/* Feature One - محاطة بالحدود */}
      <div className="w-full lg:w-[70%] lg:ml-0 lg:h-auto lg:translate-x-[50px] lg:translate-y-0 lg:border-2 lg:border-solid lg:border-gray-300 lg:flex lg:flex-row">
        {/* Left Side (Image taking 100% height of Feature One) */}
        <div className="lg:w-[50%] lg:h-full lg:border lg:flex lg:items-center">
          <img
            src="https://t4.ftcdn.net/jpg/06/02/38/09/360_F_602380945_dyTd4pr5IrbSOiHoT16042QYBwdHOlub.jpg"
            alt="cover"
            className="w-full h-full object-cover"
          />{" "}
          {/* تعديل هنا لجعل الصورة تأخذ كامل الطول */}
        </div>

        {/* Right Side (Delivery Features) */}
        <div className=" lg:w-[50%] lg:h-full lg:pl-[30px] lg:mb-3 lg:flex lg:flex-col lg:justify-between lg:space-y-4">
          <h1 className="text-3xl font-bold text-black text-center mt-3">
            Delivery Features
          </h1>

          {/* Delivery Features Container */}
          <div className="w-full flex flex-col gap-4 ">
            {/* Feature Box */}
            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto ">
              <FaTruck
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
                The Fastest Delivery in the Middle East
              </p>
            </div>

            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto ">
              <FaBoxOpen
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
                Airtight packaging service
              </p>
            </div>

            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto ">
              <IoFastFoodOutline
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
              Preservation of perishable food products
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
