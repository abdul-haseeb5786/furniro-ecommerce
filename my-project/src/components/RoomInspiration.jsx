import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function RoomInspiration() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const rooms = [
    {
      id: '01',
      type: 'Bed Room',
      name: 'Inner Peace',
      image: 'https://s3-alpha-sig.figma.com/img/acc4/8179/d1b18b523420e79dda1e92951ecde49b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mi-RmAxTufdhS2rE5RVadS6zUrGGuR1nD~DWNhj~hDs8lz9LfZK1Td67YUwVqEgx3ImnPNKebraoDUvI3XWf1QR4nsc8LRwiD7gjzseoxuib4P51Sc~xg7Qxbq-BjcyNSulD0~71HqTV7cNiS4bMPazRN-gBxHxJUe5Bs75G7Qki8sjWghASfDzqNO0v9E0ZlIMv~LbtaH~lixdbsuGwcv9unIhmO4GYFRpTxRlPvwCZNnHEA2JymJYGIlWeFEuIvsDruEjX-AwK0vkBx5Pt9Dqn05prVRa6vrro8tihF8xrl1eFpj3nYSJFuC4okN~TUZj-TJo8e4fxeshiz3pbFw__'
    },
    {
      id: '02',
      type: 'Living Room',
      name: 'Relaxing Space',
      image: 'https://s3-alpha-sig.figma.com/img/f89a/66d9/4961c3801f4c07439f27b13468e5e545?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cODEA1bY4akRpfqv1587rc-pMB6GVOARCkqw2UK38F6I1Xq-Ss-8sXIM07WBbuxBX9Cc0LM5Sgsi7~pk5Wyq3WzFVO46XkaahA4Pmnd8D1bH1vUT76wJ6WLJbafWztuznKjqZc058wrLbrDNrgPYhSaV~sGTiA2arWqAITW-xhg-m8eSR65L3kckDmE3BXwwLlKn44Kln7EfGtm-aps7~67RVBrgHn~X62FYOQlK0Ts8YEiciRUd9hFRPuoQZoRKL-w3lUyhVI3WUHB8s0IhSyR7TwRicEs7cNK-OrLIcyOaKZlDFGC7xGAWbbHtTUqGnrm8cPy37zt5jdo62ro2CQ__  '
    },
    {
      id: '03',
      type: 'Kitchen',
      name: 'Cooking Delight',
      image: 'https://s3-alpha-sig.figma.com/img/acc4/8179/d1b18b523420e79dda1e92951ecde49b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mi-RmAxTufdhS2rE5RVadS6zUrGGuR1nD~DWNhj~hDs8lz9LfZK1Td67YUwVqEgx3ImnPNKebraoDUvI3XWf1QR4nsc8LRwiD7gjzseoxuib4P51Sc~xg7Qxbq-BjcyNSulD0~71HqTV7cNiS4bMPazRN-gBxHxJUe5Bs75G7Qki8sjWghASfDzqNO0v9E0ZlIMv~LbtaH~lixdbsuGwcv9unIhmO4GYFRpTxRlPvwCZNnHEA2JymJYGIlWeFEuIvsDruEjX-AwK0vkBx5Pt9Dqn05prVRa6vrro8tihF8xrl1eFpj3nYSJFuC4okN~TUZj-TJo8e4fxeshiz3pbFw__'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (rooms.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (rooms.length - 1)) % (rooms.length - 1))
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
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
        <div className="lg:w-2/3 relative flex space-x-4">
          <div className="w-2/3 relative">
            <img
              src={rooms[currentSlide].image}
              alt={rooms[currentSlide].name}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-white p-6">
              <p className="text-gray-500 mb-2">{rooms[currentSlide].id} — {rooms[currentSlide].type}</p>
              <h3 className="text-2xl font-bold text-gray-800">{rooms[currentSlide].name}</h3>
            </div>
            <button
              onClick={prevSlide}
              className="absolute bottom-6 right-20 bg-[#B88E2F] text-white p-3 hover:bg-[#A17A1A] transition duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute bottom-6 right-6 bg-[#B88E2F] text-white p-3 hover:bg-[#A17A1A] ta transition duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="w-1/3">
            <img
              src={rooms[(currentSlide + 1) % rooms.length].image}
              alt={rooms[(currentSlide + 1) % rooms.length].name}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {rooms.slice(0, -1).map((_, index) => (
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