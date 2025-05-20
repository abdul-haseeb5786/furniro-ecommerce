import React from 'react';


export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      

      {/* Hero Section */}
      <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-88px)]">
      <img
  src="home/hero.jpg"
  alt="Modern furniture setup"
  className="w-full h-full object-cover"
/>

        <div className="absolute top-0 right-0 bottom-0 w- md:w-[60%] lg:w-[45%] bg-[#FFF3E3] bg-opacity-90 md:bg-opacity-100 flex flex-col justify-center px-6 md:px-12 lg:px-16">
          <h2 className="text-sm md:text-base font-semibold text-[#333333] mb-2 md:mb-4">New Arrival</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B88E2F] mb-4 md:mb-6 leading-tight">
            Discover Our<br />New Collection
          </h1>
          <p className="text-[#333333] mb-6 md:mb-8 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            elit tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-[#B88E2F] text-white font-bold py-3 px-6 md:py-4 md:px-10 hover:bg-[#A17A1A] transition duration-300 w-fit text-sm md:text-base">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
