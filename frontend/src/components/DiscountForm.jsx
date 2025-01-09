import React from "react";

const DiscountForm = () => {

  return (
<div className="flex justify-center items-center mb-[200px]">
  <form className="translate-y-28 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto text-center">
    <div>
      <h1 className="mb-4 text-xl font-bold">
        20% Discount on all shipments if you enter your email
      </h1>
    </div>
    <div className="flex items-center ">
      <input
        type="email"
        required
        className="border py-2 px-3 flex-grow h-[50px] outline-none text-b "  // تأكد من أن الـ input يأخذ نفس الارتفاع
        placeholder="Enter your email"
      />
      <button 
        type="Submit" 
        className="bg-red-700 text-white p-2 w-[25%] h-[50px] hover:bg-red-800 duration-300"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  );
};

export default DiscountForm;
