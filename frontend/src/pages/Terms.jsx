import React from 'react';
import { 
 DocumentTextIcon, 
 ScaleIcon, 
 ExclamationTriangleIcon,
 CurrencyDollarIcon,
 ClockIcon,
 ShieldCheckIcon} 
 from '@heroicons/react/24/outline';
const Terms = () => {
 const sections = [
   {
     title: "Acceptance of Terms",
     content: `By accessing and using Shippe's services, you acknowledge that you have read, 
     understood, and agree to be bound by these Terms of Service. If you do not agree with 
     any part of these terms, you may not use our services.`,
     icon: DocumentTextIcon
   },
   {
     title: "Service Description",
     content: `Shippe provides logistics and shipping services, including but not limited to 
     freight forwarding, cargo tracking, and supply chain management. We reserve the right 
     to modify, suspend, or discontinue any aspect of our services at any time.`,
     icon: ScaleIcon
   },
   {
     title: "User Responsibilities",
     items: [
       "Provide accurate and complete information",
       "Maintain the security of your account credentials",
       "Comply with all applicable laws and regulations",
       "Not interfere with the proper working of the service",
       "Not attempt to gain unauthorized access to our systems"
     ],
     icon: ExclamationTriangleIcon
   },
   {
     title: "Pricing and Payments",
     items: [
       "All fees are subject to change with notice",
       "Payments must be made in full before service delivery",
       "We accept major credit cards and bank transfers",
       "Refunds are subject to our refund policy",
       "Additional charges may apply for special handling"
     ],
     icon: CurrencyDollarIcon
   },
   {
     title: "Service Timeline",
     items: [
       "Delivery times are estimates only",
       "Force majeure events may affect delivery schedules",
       "Claims must be filed within 48 hours of delivery",
       "Tracking information is updated regularly",
       "Customer support available during business hours"
     ],
     icon: ClockIcon
   }
 ];
  return (
   <div className="translate-y-[-100px] bg-gray-50 pt-24 pb-12">
     {/* Header Section */}
     <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
         <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
           Terms of Service
         </h1>
         <p className="text-blue-100 text-center max-w-2xl mx-auto">
           Last updated: March 15, 2024
         </p>
       </div>
     </div>
      {/* Main Content */}
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Introduction */}
       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
         <div className="flex items-center mb-4">
           <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3" />
           <h2 className="text-xl font-semibold text-gray-900">
             Introduction
           </h2>
         </div>
         <p className="text-gray-600 leading-relaxed">
           Welcome to Shippe. These Terms of Service govern your use of our website, 
           applications, and shipping services. Please read these terms carefully before 
           using our services.
         </p>
       </div>
        {/* Main Sections */}
       <div className="space-y-8">
         {sections.map((section, index) => (
           <div key={index} className="bg-white rounded-xl shadow-sm p-6">
             <div className="flex items-center mb-4">
               <section.icon className="h-6 w-6 text-blue-600 mr-3" />
               <h2 className="text-xl font-semibold text-gray-900">
                 {section.title}
               </h2>
             </div>
             {section.content ? (
               <p className="text-gray-600 leading-relaxed">
                 {section.content}
               </p>
             ) : (
               <ul className="space-y-3">
                 {section.items.map((item, idx) => (
                   <li key={idx} className="flex items-start">
                     <span className="h-6 w-6 flex items-center justify-center text-blue-600 mr-2">•</span>
                     <span className="text-gray-600">{item}</span>
                   </li>
                 ))}
               </ul>
             )}
           </div>
         ))}
       </div>
        {/* Disclaimer Section */}
       <div className="mt-12 bg-yellow-50 rounded-xl shadow-sm p-6">
         <div className="flex items-start">
           <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
           <div>
             <h2 className="text-xl font-semibold text-gray-900 mb-3">
               Disclaimer
             </h2>
             <p className="text-gray-600 leading-relaxed">
               Our services are provided as is without any warranties, expressed or implied. 
               Shippe does not warrant that the service will be uninterrupted or error-free. 
               You acknowledge that your use of the service is at your sole risk.
             </p>
           </div>
         </div>
       </div>
        {/* Contact Section */}
       <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
         <h2 className="text-xl font-semibold text-gray-900 mb-4">
           Questions About our Terms?
         </h2>
         <p className="text-gray-600 mb-4">
           If you have any questions about these Terms of Service, please contact us:
         </p>
         <div className="space-y-2">
           <p className="text-gray-600">Email: legal@shippe.com</p>
           <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
           <p className="text-gray-600">Address: 123 Legal Avenue, Business City, 12345</p>
         </div>
       </div>
        {/* Footer Note */}
       <div className="mt-12 text-center text-sm text-gray-500">
         <p>
           By using Shippe services, you acknowledge that you have read and understood 
           these Terms of Service and agree to be bound by them.
         </p>
       </div>
     </div>
   </div>
 )}

export default Terms