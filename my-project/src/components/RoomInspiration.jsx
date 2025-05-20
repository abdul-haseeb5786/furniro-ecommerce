import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function RoomInspiration() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const rooms = [
    {
      id: '01',
      type: 'Bed Room',
      name: 'Inner Peace',
      image: '/home/ins1.png' // Make sure this image is in /public/home/
    },
    {
      id: '02',
      type: 'Living Room',
      name: 'Relaxing Space',
      image: '/home/ins2.png'
    },
    {
      id: '03',
      type: 'Kitchen',
      name: 'Cooking Delight',
      image: '/home/ins3.png'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length)
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left content */}
        <div className="lg:w-1/3 mb-8 lg:mb-0 pr-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-gray-600 mb-8">
            Our designer already made a lot of beautiful prototipe of rooms that inspire you
          </p>
          <button className="bg-[#B88E2F] text-white font-bold py-3 px-6 hover:bg-[#A17A1A] transition duration-300">
            Explore More
          </button>
        </div>

        {/* Right image slider */}
        <div className="lg:w-2/3 relative flex space-x-4">
          {/* Main image */}
          <div className="w-2/3 relative overflow-hidden">
            <img
              key={rooms[currentSlide].id}
              src={rooms[currentSlide].image}
              alt={rooms[currentSlide].name}
              className="w-full h-[400px] md:h-[600px] object-cover transition-opacity duration-500 ease-in-out opacity-100"
            />
            <div className="absolute bottom-0 left-0 bg-white p-6">
              <p className="text-gray-500 mb-2">
                {rooms[currentSlide].id} — {rooms[currentSlide].type}
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {rooms[currentSlide].name}
              </h3>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute bottom-6 right-20 bg-[#B88E2F] text-white p-3 hover:bg-[#A17A1A] transition duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute bottom-6 right-6 bg-[#B88E2F] text-white p-3 hover:bg-[#A17A1A] transition duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Next preview image */}
          <div className="w-1/3">
            <img
              src={rooms[(currentSlide + 1) % rooms.length].image}
              alt={rooms[(currentSlide + 1) % rooms.length].name}
              className="w-full h-[400px] md:h-[600px] object-cover transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {rooms.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-[#B88E2F]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
