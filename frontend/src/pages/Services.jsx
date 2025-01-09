import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const services = [
    {
      title: "Land transportation",
      description: "Land transportation is vital for efficiently moving goods and people across cities, rural areas, and industrial hubs. It connects communities, drives economic growth, and supports logistics with trucks, trains, buses, and vans. As technology advances, it continues to evolve, offering sustainable and innovative solutions to meet modern demands while enhancing global connectivity.",
      imageUrl: "https://agslog.com/kuwait/images/srd3.png"
    },
    {
      title: "Sea transportation",
      description: "Sea transportation is essential for global trade, offering cost-effective solutions to move goods across long distances. It connects continents, supporting industries and the exchange of products and raw materials. With its capacity to handle large cargo volumes through container ships and tankers, sea transport ensures reliable delivery worldwide. As a sustainable and efficient option, it plays a key role in international supply chains, with ongoing technological advancements improving its efficiency and strengthening global commerce.",
      imageUrl: "https://ascon.az/wp-content/uploads/2023/10/sea-transport.jpeg"
    },
    {
      title: "Air transportation",
      description: "Air transportation is a fast, efficient mode of travel that plays a crucial role in global connectivity and commerce. It enables the rapid movement of passengers and time-sensitive goods, linking major cities and remote areas. Essential for industries like e-commerce, medical supply chains, and tourism, air transport fosters economic growth. As sustainability becomes a priority, innovations in fuel efficiency and carbon-neutral practices are shaping the future of air transportation, ensuring its continued impact on global society and development.",
      imageUrl: "https://media.licdn.com/dms/image/D4D12AQGb0in3IjKRuQ/article-cover_image-shrink_720_1280/0/1685118761581?e=2147483647&v=beta&t=8qMHyyIUUHcW01czQnHRn0L7vmGq28Z96tUcTTtTa8U"
    },
    {
      title: "Local transportation",
      description: "Local transportation is essential for efficiently implementing orders and delivering goods within the country. Our company specializes in providing reliable and timely local transport solutions, ensuring seamless connections between cities, towns, and rural areas. With a well-organized fleet and professional team, we handle a wide range of deliveries, from small parcels to large shipments, catering to diverse business needs. Our commitment to efficiency and customer satisfaction ensures that orders are fulfilled promptly and securely. By leveraging advanced logistics systems, we optimize routes and reduce delivery times, making us a trusted partner for businesses seeking dependable local transportation services.",
      imageUrl: "https://images.pexels.com/videos/6867876/bike-bike-delivery-black-black-guy-6867876.jpeg"
    },
    {
      title: "food and nutrition preservation services",
      description: "Our company provides reliable food and nutrition preservation services to maintain the freshness and quality of food orders. We store food items in temperature-controlled fridges, ensuring their safety and nutritional value. With a cost-effective rate of $5 per week, we offer extended storage for perishable goods, protecting them from spoilage. Our service guarantees that your orders stay fresh, healthy, and ready for use whenever needed, giving you peace of mind and meeting your specific requirements.",
      imageUrl: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
    }
  ];

  return (
    <div className='min-h-screen w-[95%] lg:w-[90%] m-auto translate-y-[-60px] md:translate-y-[-80px] flex flex-col gap-6 md:gap-8 py-4 md:py-8'>
      {/* Responsive Header */}
      <div className='px-4 md:px-0 mb-2 md:mb-4'>
        <h1 className='text-3xl md:text-4xl text-gray-600 flex items-center gap-2'>
          Our 
          <span className='text-3xl md:text-4xl text-black font-semibold'>Services</span>
          <span className='hidden md:inline text-gray-400'>____</span>
        </h1>
      </div>

      {/* Services Cards */}
      <div className='flex flex-col gap-6 md:gap-8'>
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row'
          >
            {/* Image Section */}
            <div className='w-full md:w-1/2 h-[300px] md:min-h-[400px] '>
              <img
                src={service.imageUrl}
                alt={service.title}
                className='w-full h-full object-cover'
                loading="lazy"
              />
            </div>

            {/* Content Section */}
            <div className='w-full md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between'>
              <div className='space-y-3 md:space-y-4'>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 capitalize'>
                  {service.title}
                </h2>
                <p className='text-gray-600 text-base sm:text-lg line-clamp-6 md:line-clamp-none'>
                  {service.description}
                </p>
              </div>

              {/* Button Container */}
              <div className='mt-6 md:mt-4'>
                <motion.div
                  className="w-fit"
                  whileHover={{ 
                    rotateY: 180,
                    transition: { duration: 0.3 }
                  }}
                  style={{ 
                    perspective: 1000,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.button 
                    className='bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md'
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      } else {
                        navigate("/profile");
                      }
                    }}
                  >
                    Make Shipment
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services