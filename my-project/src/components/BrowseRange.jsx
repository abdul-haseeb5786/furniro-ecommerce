import React from 'react';

export default function Component() {
  const rooms = [
    {
      name: "Dining",
      image: "https://s3-alpha-sig.figma.com/img/3740/8e44/4bdba3a6bef9d68df2d9a06e32e96c61?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XXw6RA6dA0RPuroFsKj~YOAjBRDwVM9QVUIaIeGWKQeCUQwY3iTm0mPo1ZxUSWUd9HsqUbMqUb2VQlfm2PCkQKvD5D1SrAN4t8x2XLlbkaNqPnnJEqOVMLmCR1vMqiG5Yv1FuCm0i3UPswq0W-FllZp5VXfOi~v~iJ8WiTXjVwXGWERRF6KCmz1fik4mJ-0mOpoWYrSVkNxc-P7qMuvVBcyEoigt83M7RZ8I7rPWhhPvhxi~MUmJn5HUftiIi2zzJjjkrqmeizHcs4YcKFw25GLiTCQgq1ABptFb9MYrLLXBZpnqSgSl-CfZjZ5Wbvmipx39CTMviufKyc8421GwOg__  ",
      alt: "Dining room with white table and decorative items"
    },
    {
      name: "Living",
      image: "https://s3-alpha-sig.figma.com/img/b7e3/92a7/f3961ca2b1edab00f7a7640b3c2ed666?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o2~lW9AAAPhngZ~23x6w0vKw3wTleqf779HR1CESCVoBYeDJXJo9nZyGdl2f7rnQPq3pMOsUbI0ENKwxf5PoYTB8fGCLrZGw9A94zT-Xa~mLXMm7T5y1GnF4ZyuHYPNT8~OJkqAUSeU7vrQVbfKuK9S9yempdQbunRlw-t4vRveep~WGlYLPUcX-IX~KgS9f43EwuPcMb0niuX4F4R-gXZu3QwEx1Co~J3z~eXl-PPGPQchWQyzXZQFVi-ZAUv-uDu9pRxH3bKYtSckKUXwpK5rLdwxHfQYDHv~32Zhu6IPb75lE62O9QvSq6f5dJDqJm-~jh17JOVMpfUuZgfs-0w__",
      alt: "Cozy living room with beige couch and soft furnishings"
    },
    {
      name: "Bedroom",
      image: "https://s3-alpha-sig.figma.com/img/77e4/946e/ec6e291e21c9694ce22e6c5b50d777fe?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G3QqxYxCSt39qFIzLOpcVLQMU~8UmwILJW8eTRdKBOycv-CLlC~rdCUqjYIfUonhNhFS7SZimsBMDyeReRZv5k071J-vcNlvPB6Xv0dsssuSucu6aiRap11uI085j0Jt9VZtVyKELJTWrj7mPsl4Tpvlg01Morb5fIDeoBkpL9zfDir4Yd9luq1bG5wFHtKejcUCls~T-Ce3EilfFohXNXRFrtfF3b8c8zGeoS-1bV6~XAEowAVKwX5sEoJ45R09CVGvQkiVElX-EjTR8xDkmHPm4Xre-Q3YC7KZ5yuimnDchmh-3lCQtatosMW3OvaVaoENfPCSCsKWzzzlVhGbHw__",
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