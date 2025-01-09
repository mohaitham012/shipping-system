import React from 'react';
import { ShieldCheckIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
const PrivacyPolicy = () => {
 const sections = [
   {
     title: "Information We Collect",
     content: [
       "Personal identification information (Name, email address, phone number, etc.)",
       "Shipping and billing information",
       "Transaction history and preferences",
       "Device and usage information",
       "Location data (with your consent)"
     ],
     icon: DocumentTextIcon
   },
   {
     title: "How We Protect Your Data",
     content: [
       "Industry-standard encryption protocols",
       "Regular security audits and updates",
       "Strict access controls and authentication",
       "Secure data storage and backup systems",
       "Compliance with international security standards"
     ],
     icon: ShieldCheckIcon
   },
   {
     title: "Your Privacy Rights",
     content: [
       "Right to access your personal data",
       "Right to correct or update your information",
       "Right to opt-out of marketing communications",
       "Right to delete your account and data",
       "Right to data portability"
     ],
     icon: LockClosedIcon
   }
 ];
  return (
   <div className="translate-y-[-100px] bg-gray-50 pt-24 pb-12">
     {/* Header Section */}
     <div className="bg-white border-b">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
           Privacy Policy
         </h1>
         <p className="text-gray-600 text-center max-w-2xl mx-auto">
           Last updated: March 15, 2024
         </p>
       </div>
     </div>
      {/* Main Content */}
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Introduction */}
       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
         <p className="text-gray-600 leading-relaxed">
           At Shippe, we take your privacy seriously. This Privacy Policy explains how we collect, 
           use, disclose, and safeguard your information when you use our shipping and logistics 
           services. Please read this privacy policy carefully. By using our services, you agree 
           to the practices described in this policy.
         </p>
       </div>
        {/* Key Sections */}
       <div className="space-y-8">
         {sections.map((section, index) => (
           <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
             <div className="p-6">
               <div className="flex items-center mb-6">
                 <section.icon className="h-6 w-6 text-blue-600 mr-3" />
                 <h2 className="text-xl font-semibold text-gray-900">
                   {section.title}
                 </h2>
               </div>
               <ul className="space-y-3">
                 {section.content.map((item, idx) => (
                   <li key={idx} className="flex items-start">
                     <span className="h-6 w-6 flex items-center justify-center text-blue-600 mr-2">•</span>
                     <span className="text-gray-600">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         ))}
       </div>
        {/* Additional Information */}
       <div className="mt-12 space-y-8">
         <div className="bg-white rounded-xl shadow-sm p-6">
           <h2 className="text-xl font-semibold text-gray-900 mb-4">
             Changes to This Policy
           </h2>
           <p className="text-gray-600 leading-relaxed">
             We may update our Privacy Policy from time to time. We will notify you of any changes 
             by posting the new Privacy Policy on this page and updating the Last updated date. 
             You are advised to review this Privacy Policy periodically for any changes.
           </p>
         </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
           <h2 className="text-xl font-semibold text-gray-900 mb-4">
             Contact Us
           </h2>
           <p className="text-gray-600 leading-relaxed mb-4">
             If you have any questions or suggestions about our Privacy Policy, do not hesitate 
             to contact us.
           </p>
           <div className="space-y-2">
             <p className="text-gray-600">Email: privacy@shippe.com</p>
             <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
             <p className="text-gray-600">Address: 123 Privacy Street, Secure City, 12345</p>
           </div>
         </div>
       </div>
        {/* Trust Badges */}
       <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
         {['GDPR Compliant', 'ISO 27001', 'SSL Secured', 'Privacy Shield'].map((badge) => (
           <div 
             key={badge}
             className="bg-white rounded-lg shadow-sm p-4 text-center"
           >
             <div className="text-blue-600 font-semibold">{badge}</div>
           </div>
         ))}
       </div>
        {/* Footer Note */}
       <div className="mt-12 text-center text-sm text-gray-500">
         <p>
           This privacy policy is intended to help you understand how we handle your information 
           and to show our commitment to protecting your privacy.
         </p>
       </div>
     </div>
   </div>
 )}

export default PrivacyPolicy