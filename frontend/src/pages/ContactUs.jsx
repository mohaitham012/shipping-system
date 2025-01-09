import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import {ShopContext} from '../context/ShopContextProvider'
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-green-600" />,
      title: "Phone",
      details: ["+20 (101) 137-1368", "+20 (100) 096-7164"],
      description: "24/7 Customer Support"
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-600" />,
      title: "Email",
      details: ["mohamedhaithame320@gmail.com", "info@shippecompany.com"],
      description: "Online Support"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-green-600" />,
      title: "Location",
      details: ["123 Shipping Street", "New York, NY 10001"],
      description: "Headquarters"
    },
    {
      icon: <FaClock className="text-2xl text-green-600" />,
      title: "Working Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 3:00 PM"],
      description: "Customer Service Hours"
    }
  ];
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const {backendUrl} = useContext(ShopContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post(`${backendUrl}/api/contact/create`,
      {name:formData.name,
        email:formData.email,
        phone:formData.phone,
        subject:formData.subject,
        message:formData.message
      }
    )
    .then((response)=>{
      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.msg)
      }else{
        toast.error(response.data.msg)
      }
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }

  return (
    <div className="min-h-screen w-[95%] lg:w-[90%] mx-auto translate-y-[-60px] md:translate-y-[-80px] py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Need assistance with your shipment? Our dedicated team is here to help. 
          Reach out through any of our contact channels for prompt support.
        </p>
      </div>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              {info.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">{detail}</p>
              ))}
              <p className="text-sm text-gray-500 mt-2">{info.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              required
              type="text"
              id="name"
              name='name'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              required
              type="email"
              name='email'
              onChange={handleChange}
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              required
              type="tel"
              id="phone"
              name='phone'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              
              type="text"
              id="subject"
              name='subject'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Shipping Inquiry"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              name='message'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;