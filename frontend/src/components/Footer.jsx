import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full flex flex-col pt-10 mt-auto">
      {/* Up Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 mb-8">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start">
          <img src="/public/assets/logo.png" alt="logo" className="w-28 h-28" />
        </div>
        {/* Navigation Links 1 */}
        <div className="w-full sm:w-[80%]">
          <ul className="flex flex-col gap-2 items-center sm:items-start">
            <Link to="/">
              <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
                Home
              </li>
            </Link>
            <Link to="/services">
              <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
                Services
              </li>
            </Link>
            <Link to="/contact">
              <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
                Contact Us
              </li>
            </Link>
            <Link to="/about">
              <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
                About Us
              </li>
            </Link>
          </ul>
        </div>
        {/* Navigation Links 2 */}
        <div className="w-full sm:w-[80%]">
          <ul className="flex flex-col gap-2 items-center sm:items-start">
          <Link to='/blog' className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Blog
              </Link> 
            <Link to='/careers' className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Careers
            </Link>
            <Link to='/privacy' className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Privacy Policy
            </Link>
            <Link to='/terms' className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Terms of Service
            </Link>
          </ul>
        </div>
        {/* Navigation Links 3 */}
        <div className="w-full sm:w-[80%]">
          <ul className="flex flex-col gap-2 items-center sm:items-start">
            <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              FAQ
            </li>
            <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Support
            </li>
            <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Partners
            </li>
            <li className="cursor-pointer text-base sm:text-lg lg:text-xl hover:underline">
              Sitemap
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links Section - Centered under all columns */}
      <div className="w-full flex flex-col items-center mb-8">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4">
          Social Links
        </h3>
        <div className="flex gap-6">
          <Link
            to="https://www.facebook.com/?locale=ar_AR"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaFacebook size={35} />
          </Link>
          <Link
            to="https://www.threads.net/login"
            className="text-gray-600 hover:text-black transition-colors"
          >
            <FaSquareThreads size={35} />
          </Link>
          <Link
            to="https://www.instagram.com/"
            className="text-gray-600 hover:text-pink-600 transition-colors"
          >
            <FaInstagram size={35} />
          </Link>
          <Link
            to="https://www.linkedin.com/feed/"
            className="text-gray-600 hover:text-blue-800 transition-colors"
          >
            <FaLinkedin size={35} />
          </Link>
        </div>
      </div>

      {/* Copy Writing */}
      <div className="w-full bg-black py-4 px-4 sm:px-6">
        <h1 className="text-white text-sm sm:text-base text-center sm:text-left">
          <span className="text-blue-600">Copyright</span> @ 2024 All Rights
          Reserved / Developed by{" "}
          <span className="text-blue-600">Mohmammed Haitham</span>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
