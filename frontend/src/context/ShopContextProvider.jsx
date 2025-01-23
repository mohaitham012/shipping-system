import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [authorized, setAuthorized] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const backendUrl = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  
  
  const loginAndRegisterAPI = async (
    formData,
    type,
    isSignIn,
    formDataToSend
  ) => {
    // login logic
    if (!isSignIn) {
      // register logic
      if (type === "Person") {
        await axios
          .post(`${backendUrl}/api/user/register`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.id);
              setAuthorized(true);
              setToken(response.data.token);
              setUserId(response.data.id);
              navigate('/profile')
              toast.success('registered successfully')
            }else{
              toast.error(response.data.msg);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        await axios
          .post(`${backendUrl}/api/company/register`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.id);
              setAuthorized(true)
              setToken(response.data.token);
              setUserId(response.data.id);
              toast.success('registered successfully')
              navigate('/profile')
            }else{
              toast.error(response.data.msg);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      // login logic
    } else {
      if (type === "Person") {
        await axios
          .post(`${backendUrl}/api/user/login`, {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            if (response.data.success) {
              setAuthorized(true);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.id);
              setToken(response.data.token);
              setUserId(response.data.id);
              toast.success('login successfully')
              navigate('/profile')
            }else{
              toast.error(response.data.msg)
              console.log(response);
              
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        await axios
          .post(`${backendUrl}/api/company/login`, {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.id);
              setAuthorized(true)
              setToken(response.data.token);
              setUserId(response.data.id);
              toast.success('login successfully')
              navigate('/profile') 
              }else{
                toast.error(response.data.msg);
              }
          })
          .catch((error) => {
            console.log(error.message);
            toast.error(error.message)
          });
      }
    }
  };


  const value = {
    authorized,
    setAuthorized,
    backendUrl,
    navigate,
    loginAndRegisterAPI,
    token,setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
