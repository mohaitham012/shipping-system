import React from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="relative z-0 w-full h-[700px]  overflow-hidden translate-y-[-100px]">
      {/* Background Image */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/MAERSK_MC_KINNEY_M%C3%96LLER_%26_MARSEILLE_MAERSK_%2848694054418%29.jpg/1200px-MAERSK_MC_KINNEY_M%C3%96LLER_%26_MARSEILLE_MAERSK_%2848694054418%29.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Light Gray Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to Shippe
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-2xl">
          Here is which is you look for . we seek to present good sevice and
          value for our clients. you have to trust us
        </p>
        <button
          onClick={() => {
            if (!token) {
              navigate("/login");
            } else {
              navigate("/profile");
            }
          }}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Carousel;
