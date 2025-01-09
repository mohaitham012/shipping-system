import React, { useState } from 'react';
import {
 MapPinIcon,
 BriefcaseIcon,
 ClockIcon,
 CurrencyDollarIcon,
 BuildingOfficeIcon,
 UsersIcon,
 ChevronRightIcon,
 MagnifyingGlassIcon,}
 from '@heroicons/react/24/outline';
const Careers = () => {
 const [selectedDepartment, setSelectedDepartment] = useState('All');
 const [searchQuery, setSearchQuery] = useState('');
  const departments = [
   'All',
   'Engineering',
   'Operations',
   'Marketing',
   'Sales',
   'Customer Service',
   'Finance',
 ];
 const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'New York, USA',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$120k - $150k',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Operations Manager',
    department: 'Operations',
    location: 'London, UK',
    type: 'Full-time',
    experience: '4+ years',
    salary: '£60k - £75k',
    posted: '1 week ago',
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$70k - $90k',
    posted: '3 days ago',
  },
  {
    id: 4,
    title: 'Senior Sales Executive',
    department: 'Sales',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$80k - $120k + Commission',
    posted: '1 day ago',
  },
  {
    id: 5,
    title: 'Regional Sales Manager',
    department: 'Customer Service',
    location: 'Singapore',
    type: 'Full-time',
    experience: '7+ years',
    salary: '$100k - $140k + Commission',
    posted: 'Just now',
  },
  {
    id: 6,
    title: 'Business Development Representative',
    department: 'Finance',
    location: 'Remote - APAC',
    type: 'Full-time',
    experience: '2+ years',
    salary: '$50k - $70k + Commission',
    posted: '5 days ago',
    description: 'Looking for an energetic sales professional to join our growing team...'
  }
];
  const filteredJobs = jobs.filter(job => {
   const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
   const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchQuery.toLowerCase());
   return matchesDepartment && matchesSearch;
 });
  const benefits = [
   {
     title: 'Health & Wellness',
     description: 'Comprehensive medical, dental, and vision coverage for you and your family',
     icon: '🏥',
   },
   {
     title: 'Work-Life Balance',
     description: 'Flexible working hours and remote work options',
     icon: '⚖️',
   },
   {
     title: 'Growth & Development',
     description: 'Learning stipend and career development opportunities',
     icon: '📈',
   },
   {
     title: 'Team Building',
     description: 'Regular team events and annual company retreats',
     icon: '🤝',
   },
 ];
  return (
   <div className="min-h-screen bg-gray-50">
     {/* Hero Section */}
     <div className="relative bg-blue-700 text-white py-20 sm:py-24">
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute inset-0 bg-[url('/assets/career-bg.jpg')] bg-cover bg-center opacity-20" />
       </div>
       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
           Join Our Team
         </h1>
         <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
           Be part of our mission to revolutionize global logistics and shipping
         </p>
         <div className="max-w-xl mx-auto">
           <div className="relative">
             <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
             <input
               type="text"
               placeholder="Search for jobs..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
             />
           </div>
         </div>
       </div>
     </div>
      {/* Stats Section */}
     <div className="bg-white border-b">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: 'Global Offices', value: '15+' },
             { label: 'Team Members', value: '500+' },
             { label: 'Countries', value: '25+' },
             { label: 'Open Positions', value: jobs.length },
           ].map((stat) => (
             <div key={stat.label} className="text-center">
               <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                 {stat.value}
               </div>
               <div className="text-sm sm:text-base text-gray-600">
                 {stat.label}
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Department Filter */}
       <div className="flex flex-wrap gap-2 mb-8">
         {departments.map((dept) => (
           <button
             key={dept}
             onClick={() => setSelectedDepartment(dept)}
             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
               ${selectedDepartment === dept
                 ? 'bg-blue-600 text-white'
                 : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
               }`}
           >
             {dept}
           </button>
         ))}
       </div>
        {/* Jobs Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {filteredJobs.map((job) => (
           <div
             key={job.id}
             className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
           >
             <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
                   {job.title}
                 </h3>
                 <div className="flex items-center text-gray-500 text-sm">
                   <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                   <span>{job.department}</span>
                 </div>
               </div>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                 {job.posted}
               </span>
             </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="flex items-center text-gray-500 text-sm">
                 <MapPinIcon className="h-4 w-4 mr-1" />
                 {job.location}
               </div>
               <div className="flex items-center text-gray-500 text-sm">
                 <BriefcaseIcon className="h-4 w-4 mr-1" />
                 {job.type}
               </div>
               <div className="flex items-center text-gray-500 text-sm">
                 <ClockIcon className="h-4 w-4 mr-1" />
                 {job.experience}
               </div>
               <div className="flex items-center text-gray-500 text-sm">
                 <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                 {job.salary}
               </div>
             </div>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
               View Position
               <ChevronRightIcon className="h-4 w-4 ml-2" />
             </button>
           </div>
         ))}
       </div>
        {/* Benefits Section */}
       <div className="mt-20">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
           Why Join Us?
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {benefits.map((benefit) => (
             <div
               key={benefit.title}
               className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
             >
               <div className="text-4xl mb-4">{benefit.icon}</div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">
                 {benefit.title}
               </h3>
               <p className="text-gray-600 text-sm">
                 {benefit.description}
               </p>
             </div>
           ))}
         </div>
       </div>
        {/* CTA Section */}
       <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
         <h2 className="text-2xl sm:text-3xl font-bold mb-4">
           Dont See the Right Position?
         </h2>
         <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
           Were always looking for talented individuals to join our team. Send us your resume and we ll keep you in mind for future opportunities.
         </p>
         <button className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors">
           Send Your Resume
           <ChevronRightIcon className="h-5 w-5 ml-2" />
         </button>
       </div>
     </div>
   </div>
 )}

export default Careers