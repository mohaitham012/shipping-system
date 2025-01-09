import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [type, setType] = useState("Person");
  const [formData, setFormData] = useState({
    name: "",
    profileImage: null,
    email: "",
    password: "",
    companyField: "",
  });
  const { loginAndRegisterAPI } = useContext(ShopContext);
  // Updated handleImageChange to handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file, // حفظ الملف
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("password", formData.password);
  if (type === "Company") {
    formDataToSend.append("field", formData.companyField);
  }
  if (formData.profileImage) {
    formDataToSend.append("imageUrl", formData.profileImage); // إرسال الصورة
  }

  // ... other imports and code remain the same
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('type',type)
    loginAndRegisterAPI(formData, type, isSignIn, formDataToSend);
  };

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 translate-y-[-100px]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {isSignIn ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
        {/* Account Type Selection - shown for both login and signup */}
        <div className="space-y-4">
          <p className="text-center text-sm font-medium text-gray-700">
            {isSignIn ? "Sign in as:" : "Register as:"}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setType("Person")}
              className={`px-6 py-2 rounded-md transition-colors ${
                type === "Person"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Person
            </button>
            <button
              type="button"
              onClick={() => setType("Company")}
              className={`px-6 py-2 rounded-md transition-colors ${
                type === "Company"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Company
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {!isSignIn && (
              <>
                {/* Image Upload Section */}
                <div className="flex justify-center">
                  <label
                    htmlFor="profileImage"
                    className="w-[100px] h-[100px] rounded-full flex justify-center items-center cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-colors overflow-hidden"
                  >
                    <img
                      src={!formData.profileImage ? "/public/assets/upload_area.png" : URL.createObjectURL(formData.profileImage)}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
                {/* Account Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Person">Person</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {type === "Person" ? "Full Name" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder={
                      type === "Person" ? "John Doe" : "Company Name"
                    }
                  />
                </div>
                {type === "Company" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Field
                    </label>
                    <select
                      name="companyField"
                      value={formData.companyField}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select company field</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Food">Food</option>
                      <option value="Electric Machines">
                        Electric Machines
                      </option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {isSignIn && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
