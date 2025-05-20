import React from 'react';

export default function Component() {
  const rooms = [
    {
      name: "Dining",
      image: "home/browse_one.png",
      alt: "Dining room with white table and decorative items"
    },
    {
      name: "Living",
      image: "home/browse_two.png",
      alt: "Cozy living room with beige couch and soft furnishings"
    },
    {
      name: "Bedroom",
      image: "home/browse_three.png",
      alt: "Corner of a bedroom with decorative items and plants"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">
          Browse The Range
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.name} className="flex flex-col items-center">
              <img
                src={room.image}
                alt={room.alt}
                className="w-full aspect-[4/3] object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-center text-gray-900">
                {room.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}