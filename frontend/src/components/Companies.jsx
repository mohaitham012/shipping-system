import React from 'react';

const Companies = () => {
  return (
    <div className="w-[90%] mx-auto my-10 translate-y-[-120px]"> {/* changed my-20 to my-10 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-6 flex-wrap">
        {/* Company 1 */}
        <div className="w-64 h-32 flex items-center justify-center">
          <img 
            src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/Adidas.png" 
            alt="Company 1" 
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Company 2 */}
        <div className="w-64 h-32 flex items-center justify-center">
          <img 
            src="https://inkbotdesign.com/wp-content/uploads/2015/07/Chanel-Logo-Design-1024x683.png.webp" 
            alt="Company 2" 
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Company 3 */}
        <div className="w-64 h-32 flex items-center justify-center">
          <img 
            src="https://madewaydotblog.wordpress.com/wp-content/uploads/2018/01/boss-hugo-boss-logo-design-1789049165.png?w=685" 
            alt="Company 3" 
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Company 4 */}
        <div className="w-64 h-32 flex items-center justify-center">
          <img 
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30143428/129.png" 
            alt="Company 4" 
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Company 5 */}
        <div className="w-64 h-32 flex items-center justify-center">
          <img 
            src="https://www.graphicmore.com/wp-content/uploads/2016/04/Louis-Vuitton-Logo-Design.jpg" 
            alt="Company 5" 
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Companies;