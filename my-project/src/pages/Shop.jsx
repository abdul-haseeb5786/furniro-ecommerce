import React from 'react';
import { ChevronRight } from "lucide-react";
import EnhancedProductGridWithPagination from "../components/EnhancedProductGridWithPagination";
import picture from "../assets/Frame 161.png";

export default function Shop() {
  return (
    <div>
      {/* Shop Header Section */}
      <div className="relative h-[400px] w-full overflow-hidden bg-[#f5f5f5]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DQMhw0k4Pb~8vFctwXPdJBMlP0ko5OoXuEQWDgNCyd3z7PUTHRbsjHXAvda1RNGPeL4ZxZNM7eAl~K~pHR7B50ym5aauiU2O9ssFYAooheo8xmEtYuDbxaV0RdTB5C5ZcWzjAnaEomyKTaDSBiVKoRRJaKlZWDzdwOr-fY221Ji6hW0llm5uMRnoN5ajMeAtVj~qwBR0rr5sfyg5TCpA2fJr-HoKY1mTF1DJkaFrBKnaRo9oPMZ50lXInu7aZ6Rufp6mFgV4AW1LTzkmkXBLmO6jtBDLrQyt1hqiI6v~KIcWcH8gQjk0BUIF4L~lzt-iFhD4g0RzAdrSSGJT-sf3dg__')",
            backgroundPosition: "center"
          }}
        />
        
        {/* Semi-transparent overlay to reduce background opacity */}
        <div className="absolute inset-0 bg-white bg-opacity-50" />
        
        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-center items-center">
          {/* Shop title and breadcrumb */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Shop</h1>
            <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-black transition-colors font-bold">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black font-normal">Shop</span>
            </nav>
          </div>
        </div>
      </div>
      <EnhancedProductGridWithPagination />
      <img className="mt-10 w-full" src={picture} alt="description of image" />
    </div>
  );
}