import React from "react";
import { IoCall } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { RiTeamFill } from "react-icons/ri";

const SecondFeatures = () => {
  return (
    <div className="dir-rtl mt-5 flex items-end justify-end">
      {/* Feature Two  */}
      <div className="w-full lg:w-[70%] lg:ml-0 lg:h-auto lg:translate-x-[-50px] lg:translate-y-0 lg:border-2 lg:border-solid lg:border-gray-300 lg:flex lg:flex-row-reverse ">
        {/* Right Side ) */}
        <div className="lg:w-[50%] lg:h-full lg:border lg:flex lg:items-center">
          <img
            src="https://institutebm.org.za/wp-content/uploads/2023/06/Customer-Service.jpg"
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Side (Delivery Features) */}
        <div className="lg:w-[50%] lg:h-full lg:pl-[30px] lg:mb-3 lg:flex lg:flex-col lg:justify-between lg:space-y-4">
          <h1 className="text-3xl font-bold text-black text-center mt-3">
            Customer Service
          </h1>

          {/* Customer Services Container */}
          <div className="w-full flex flex-col gap-4">
            {/* Feature Box */}
            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto">
              <IoCall
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
                Reply within 2 hours of correspondence
              </p>
            </div>

            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto">
              <TfiEmail
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
                Service and response available within 24 hours
              </p>
            </div>

            <div className="flex items-center w-full border p-4 hover:scale-[1.025] duration-300 cursor-pointer lg:w-[calc(100%-30px)] md:w-[calc(100%-30px)] md:m-auto">
              <RiTeamFill
                size={33}
                color="white"
                className="border p-2 bg-red-600"
              />
              <p className="ml-4 text-gray-500 text-xl hover:text-gray-700">
              A team follows up the shipment 24 hours a day.       
             </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondFeatures;
