import React from 'react';
import { motion } from 'framer-motion';
import { FaShip, FaTruck, FaPlane, FaUsers, FaGlobe, FaClock } from 'react-icons/fa';

const AboutUs = () => {
  const stats = [
    { icon: <FaGlobe />, number: "150+", label: "Countries Served" },
    { icon: <FaUsers />, number: "10K+", label: "Happy Customers" },
    { icon: <FaTruck />, number: "500+", label: "Vehicles" },
    { icon: <FaClock />, number: "24/7", label: "Support" }
  ];

  const features = [
    {
      icon: <FaShip className="text-4xl text-green-600" />,
      title: "Global Shipping Network",
      description: "Our extensive network connects businesses and individuals across continents, ensuring reliable delivery worldwide."
    },
    {
      icon: <FaTruck className="text-4xl text-green-600" />,
      title: "Modern Fleet",
      description: "State-of-the-art vehicles and vessels equipped with advanced tracking and temperature control systems."
    },
    {
      icon: <FaPlane className="text-4xl text-green-600" />,
      title: "Express Delivery",
      description: "Fast and efficient air freight services for time-sensitive shipments with guaranteed delivery times."
    }
  ];

  return (
    <div className="min-h-screen w-[95%] lg:w-[90%] mx-auto translate-y-[-60px] md:translate-y-[-80px] py-8 md:py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          With over 20 years of experience in global logistics, we've built a reputation 
          for reliability, efficiency, and excellence in shipping services.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-green-600 text-3xl mb-2">{stat.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{stat.number}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-8 rounded-xl shadow-lg mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-gray-600 text-lg text-center max-w-4xl mx-auto">
          To provide innovative and sustainable shipping solutions that connect businesses 
          and people worldwide. We strive to deliver excellence through reliable service, 
          cutting-edge technology, and environmental responsibility.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Experience & Expertise</h3>
            <p className="text-gray-600">
              With decades of experience in global logistics, our team brings unmatched 
              expertise to every shipment.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Advanced Technology</h3>
            <p className="text-gray-600">
              Real-time tracking, automated systems, and digital solutions for seamless 
              shipping operations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Global Network</h3>
            <p className="text-gray-600">
              Extensive network of partners and routes covering major global trade lanes.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Customer Focus</h3>
            <p className="text-gray-600">
              Dedicated support team available 24/7 to assist with your shipping needs.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;