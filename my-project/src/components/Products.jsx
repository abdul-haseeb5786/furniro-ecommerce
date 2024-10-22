import React, { useState } from 'react';
import { Share2, BarChart2, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const products = [
  { id: 1, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: 'https://s3-alpha-sig.figma.com/img/50f3/12dc/a7c05024ab4e27374edb12195b6559e2?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hxA8BPvp3NfCqhCt-~eMuzleLnFTGJxwOx54xAsHEGILiZpIlEBqnRxp18lK0ggrybanlLfF9oxg52elEztKOz8BgcwQu1LpdBuG5LcA4swG3JT1495Ug-S2Cj4jXAmPDrSOTs4iyejO9VC5Y6OpxAfaVoYEFJI-XrgLO-kfsLHxvz1zlBM7r9kZL-7Wa~fFJKdSY3OUgbP54pwzXtshNmD3Os9~tagfqBeRQknPbF7nrmH9BYvunYuTiB6rBjxzWF8uF~gDrZJJ20EX~ff-7QKPlsncDcHy4iVl0GokXnzXxN3TzGYQcMe11hyhLZpFJtqqFBb11zuwsUx1hbhdTA__', discount: 30 },
  { id: 2, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: 'https://s3-alpha-sig.figma.com/img/b609/6926/ea43a4c55f9e28aa3592f17ff47a4303?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KlQFooE9A8crt8BG9SVu2WMx4jAR7ln08Zkb~edo9ddjBm-UxD4-LgNMPrTVslDjIi8jGgeB1cljOJDm62GeHXM0FOfdEf8nehTlzdvmlRu56~hU7Guq97t2F50HD~2lf9fhDMRCUEv4EKzscHtXmWvuQXCC6tTbyln6-Zt4i~L8L81z3G-UWZd0VnTpM~cuVDCbRMadzNEe60TcQDvUX8lDOiXv6KuZuAVN1HxJY7i-LAa2LIYJQG7f8OFvdiPr1YPwYNnXxUhoraD3XYc4dArBLvuwExKbh0baY6Q0H80RtphyIFEHlD3GH0VlOX0jzFe3uXBi~Ujb~8ePCFp7WA__' },
  { id: 3, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: 'https://s3-alpha-sig.figma.com/img/8d34/199d/e77ede2f478b2f26210bd264978981f6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X-82pSg-TNfBI7q-B2Uh2skT4~IpfQCjlBeot2s26td9rfPPipwB1QTR9pe4pPwvcqgy7BuuZmNH-DHxth5s4z6DUr5sCHIN7qLKnPr657ZIOh2AEE0litB7StG8zrnOiLWZuek-GaZkmuEQfpALJQsNDO61TFP0Lt5YYrhmdG~vQrZg25J9jMaU07hiQZyYBt6YuDyVUZj-ACjec0yYaSd29~X06GcsIu5Znr7bN-2qkF0dRW2Jn4HHxUwAhVCTFvrBmtmsZ2CpGl8Y6KMqKPobPd7DHo4JtmbWKP8BRJw7nVZ1-LR6Ct-nfC69o4QVHNM5kPnrwBHa4PiuIdN6bA__', discount: 50 },
  { id: 4, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: 'https://s3-alpha-sig.figma.com/img/6028/dfe0/3d98b27fb98ee49958d7089f10d39dfe?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FiEnjRO0UyQfkxbyA8KkF3CUW3wozAdm77NHagcHeY7aSAGQp6meuBduVr4FgWJ6OgUr5kXspXepBTSRXNZfvpz7YY88JrbhZolbFQgwcHdfAnUMHPW0VVRElHWNpMuhWk7hxvJXUDIg40V7kOE1cl6XXtnkR0Y0JJrgrrY2Tk5KahU1FEfnq8QGdeNmTHgG2-fMkVk4dm7wyfveQkI0huw10dMV7HhSWgu7DVhoBTUAmB9u1Z0CTmX19rpvwB88WC033C0v30hRRI1HWdSQmAE04KO0Ad-65TLgEPfghXazJSHO48uWAXVJFPqUVUmyzA67zIacIgCqvri45xajsg__', isNew: true },
  { id: 5, name: 'Grifo', description: 'Night lamp', price: 1500000, image: 'https://s3-alpha-sig.figma.com/img/2084/99f3/7c62fb49f7d4a1a6a5dc5959b40150ed?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PMhDrzC0WN1jdOfndS1wyug6wpsNZvXKFz2zpBWi--06oHGCZ9EjwYqQKjaQCEdITQ6pTs-iKlGHiRNlI7jqCOAvGWSiMIL5izhiQxoX6OzMUbqCN0sjxiV5fnDk1XOaydFkYQYV-g-TI-J8kgiXFVk9fv9G9xlkLryljTDm103xfzUu9jsrO2H53tFZoHvfnGDfDSDdikniP5~0zn8qzIE1KwvekCOPHqf6~VgAGduc9~YDHus7NxPxpCF2pPapyZWLyCWA7Lf~2V71zhRQqJHUgAkqzd9N4ZyilD6SwpHSbORrwXxvg0Xk3mDZF~I6tLHnYSsCYt4KpYcc63povg__' },
  { id: 6, name: 'Muggo', description: 'Small mug', price: 150000, image: 'https://s3-alpha-sig.figma.com/img/1f73/e563/4a5dbc0c29efbae1beca6ab40dd9b598?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=plVBos8w7DI9diB3nTh~IotllWBuhK-nBHl6ujS17ZxkkaEYQUQpm7s0Hjdd8R3oBDbu5Shh7ovpit5iI4Hph8M2jRQOTU98pV3yLIbcsoa8q~9VdymJgTwuR5aYNrL73kIB43dYwjsnbLh~Bl7abczl5SEAZEMTCqNSTuiu-T5LlQ9A6tSBZo4XEbWFBms4iERBsIJwFFO6XdB7rnaZwyLx3SmKq9nU0R83Eka4mZBal1~O6NiERiFBYHbT8h5g6h-UocCziP~h~sjj3JXUNR~MBLMWNvYAECVT0mG9v9hzOgPyozhI8zJ1qznJopz6~6dvFHpg9QnCa8Imju-1Ww__', isNew: true },
  { id: 7, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: 'https://s3-alpha-sig.figma.com/img/4491/a0ea/43eebd52ea72d60650f31030ec4bf7e6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QNJNS3JoqwgeQRUCztA~KbtfAoVGWMTN9fzBduqRDfbEgPpJRCjM4AKf76HekDW0~enab~dcf7QQRS9SNDtnpHtDgsiZ5XRrevAa1PfTG77IpIo9ThWoGEBkRXVYx-WyrycELDgOK8CAUWd5k7x0Cfl2oKxB~7W2t46q3N2Jsrfebj0avj4mpWAHu6ZXwsJT4VgpIeli~pKzDGgYRUJqdOXUjvDMsGnMpeT4XQmorxylCx14f7JSJ7D5VhBcykebHLhVdzgJpZ5XWGxiYVCoypwSwyL5qeSq1-7x49eTziMAAHco589hlQv4p1AGianh105pn2y78HmMDP0yRptDLw__', discount: 50 },
  { id: 8, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: 'https://s3-alpha-sig.figma.com/img/4491/a0ea/43eebd52ea72d60650f31030ec4bf7e6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QNJNS3JoqwgeQRUCztA~KbtfAoVGWMTN9fzBduqRDfbEgPpJRCjM4AKf76HekDW0~enab~dcf7QQRS9SNDtnpHtDgsiZ5XRrevAa1PfTG77IpIo9ThWoGEBkRXVYx-WyrycELDgOK8CAUWd5k7x0Cfl2oKxB~7W2t46q3N2Jsrfebj0avj4mpWAHu6ZXwsJT4VgpIeli~pKzDGgYRUJqdOXUjvDMsGnMpeT4XQmorxylCx14f7JSJ7D5VhBcykebHLhVdzgJpZ5XWGxiYVCoypwSwyL5qeSq1-7x49eTziMAAHco589hlQv4p1AGianh105pn2y78HmMDP0yRptDLw__', isNew: true },
  { id: 9, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: 'https://s3-alpha-sig.figma.com/img/1f73/e563/4a5dbc0c29efbae1beca6ab40dd9b598?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=plVBos8w7DI9diB3nTh~IotllWBuhK-nBHl6ujS17ZxkkaEYQUQpm7s0Hjdd8R3oBDbu5Shh7ovpit5iI4Hph8M2jRQOTU98pV3yLIbcsoa8q~9VdymJgTwuR5aYNrL73kIB43dYwjsnbLh~Bl7abczl5SEAZEMTCqNSTuiu-T5LlQ9A6tSBZo4XEbWFBms4iERBsIJwFFO6XdB7rnaZwyLx3SmKq9nU0R83Eka4mZBal1~O6NiERiFBYHbT8h5g6h-UocCziP~h~sjj3JXUNR~MBLMWNvYAECVT0mG9v9hzOgPyozhI8zJ1qznJopz6~6dvFHpg9QnCa8Imju-1Ww__', discount: 30 },
  { id: 10, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: 'https://s3-alpha-sig.figma.com/img/2084/99f3/7c62fb49f7d4a1a6a5dc5959b40150ed?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PMhDrzC0WN1jdOfndS1wyug6wpsNZvXKFz2zpBWi--06oHGCZ9EjwYqQKjaQCEdITQ6pTs-iKlGHiRNlI7jqCOAvGWSiMIL5izhiQxoX6OzMUbqCN0sjxiV5fnDk1XOaydFkYQYV-g-TI-J8kgiXFVk9fv9G9xlkLryljTDm103xfzUu9jsrO2H53tFZoHvfnGDfDSDdikniP5~0zn8qzIE1KwvekCOPHqf6~VgAGduc9~YDHus7NxPxpCF2pPapyZWLyCWA7Lf~2V71zhRQqJHUgAkqzd9N4ZyilD6SwpHSbORrwXxvg0Xk3mDZF~I6tLHnYSsCYt4KpYcc63povg__' },
  { id: 11, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: 'https://s3-alpha-sig.figma.com/img/6028/dfe0/3d98b27fb98ee49958d7089f10d39dfe?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FiEnjRO0UyQfkxbyA8KkF3CUW3wozAdm77NHagcHeY7aSAGQp6meuBduVr4FgWJ6OgUr5kXspXepBTSRXNZfvpz7YY88JrbhZolbFQgwcHdfAnUMHPW0VVRElHWNpMuhWk7hxvJXUDIg40V7kOE1cl6XXtnkR0Y0JJrgrrY2Tk5KahU1FEfnq8QGdeNmTHgG2-fMkVk4dm7wyfveQkI0huw10dMV7HhSWgu7DVhoBTUAmB9u1Z0CTmX19rpvwB88WC033C0v30hRRI1HWdSQmAE04KO0Ad-65TLgEPfghXazJSHO48uWAXVJFPqUVUmyzA67zIacIgCqvri45xajsg__', discount: 50 },
  { id: 12, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: 'https://s3-alpha-sig.figma.com/img/8d34/199d/e77ede2f478b2f26210bd264978981f6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X-82pSg-TNfBI7q-B2Uh2skT4~IpfQCjlBeot2s26td9rfPPipwB1QTR9pe4pPwvcqgy7BuuZmNH-DHxth5s4z6DUr5sCHIN7qLKnPr657ZIOh2AEE0litB7StG8zrnOiLWZuek-GaZkmuEQfpALJQsNDO61TFP0Lt5YYrhmdG~vQrZg25J9jMaU07hiQZyYBt6YuDyVUZj-ACjec0yYaSd29~X06GcsIu5Znr7bN-2qkF0dRW2Jn4HHxUwAhVCTFvrBmtmsZ2CpGl8Y6KMqKPobPd7DHo4JtmbWKP8BRJw7nVZ1-LR6Ct-nfC69o4QVHNM5kPnrwBHa4PiuIdN6bA__', isNew: true },
  { id: 13, name: 'Grifo', description: 'Night lamp', price: 1500000, image: 'https://s3-alpha-sig.figma.com/img/b609/6926/ea43a4c55f9e28aa3592f17ff47a4303?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KlQFooE9A8crt8BG9SVu2WMx4jAR7ln08Zkb~edo9ddjBm-UxD4-LgNMPrTVslDjIi8jGgeB1cljOJDm62GeHXM0FOfdEf8nehTlzdvmlRu56~hU7Guq97t2F50HD~2lf9fhDMRCUEv4EKzscHtXmWvuQXCC6tTbyln6-Zt4i~L8L81z3G-UWZd0VnTpM~cuVDCbRMadzNEe60TcQDvUX8lDOiXv6KuZuAVN1HxJY7i-LAa2LIYJQG7f8OFvdiPr1YPwYNnXxUhoraD3XYc4dArBLvuwExKbh0baY6Q0H80RtphyIFEHlD3GH0VlOX0jzFe3uXBi~Ujb~8ePCFp7WA__' },
  { id: 14, name: 'Muggo', description: 'Small mug', price: 150000, image: 'https://s3-alpha-sig.figma.com/img/50f3/12dc/a7c05024ab4e27374edb12195b6559e2?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hxA8BPvp3NfCqhCt-~eMuzleLnFTGJxwOx54xAsHEGILiZpIlEBqnRxp18lK0ggrybanlLfF9oxg52elEztKOz8BgcwQu1LpdBuG5LcA4swG3JT1495Ug-S2Cj4jXAmPDrSOTs4iyejO9VC5Y6OpxAfaVoYEFJI-XrgLO-kfsLHxvz1zlBM7r9kZL-7Wa~fFJKdSY3OUgbP54pwzXtshNmD3Os9~tagfqBeRQknPbF7nrmH9BYvunYuTiB6rBjxzWF8uF~gDrZJJ20EX~ff-7QKPlsncDcHy4iVl0GokXnzXxN3TzGYQcMe11hyhLZpFJtqqFBb11zuwsUx1hbhdTA__', isNew: true },
  { id: 15, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: 'https://s3-alpha-sig.figma.com/img/4491/a0ea/43eebd52ea72d60650f31030ec4bf7e6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QNJNS3JoqwgeQRUCztA~KbtfAoVGWMTN9fzBduqRDfbEgPpJRCjM4AKf76HekDW0~enab~dcf7QQRS9SNDtnpHtDgsiZ5XRrevAa1PfTG77IpIo9ThWoGEBkRXVYx-WyrycELDgOK8CAUWd5k7x0Cfl2oKxB~7W2t46q3N2Jsrfebj0avj4mpWAHu6ZXwsJT4VgpIeli~pKzDGgYRUJqdOXUjvDMsGnMpeT4XQmorxylCx14f7JSJ7D5VhBcykebHLhVdzgJpZ5XWGxiYVCoypwSwyL5qeSq1-7x49eTziMAAHco589hlQv4p1AGianh105pn2y78HmMDP0yRptDLw__', discount: 50 },
  { id: 16, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: 'https://s3-alpha-sig.figma.com/img/4491/a0ea/43eebd52ea72d60650f31030ec4bf7e6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QNJNS3JoqwgeQRUCztA~KbtfAoVGWMTN9fzBduqRDfbEgPpJRCjM4AKf76HekDW0~enab~dcf7QQRS9SNDtnpHtDgsiZ5XRrevAa1PfTG77IpIo9ThWoGEBkRXVYx-WyrycELDgOK8CAUWd5k7x0Cfl2oKxB~7W2t46q3N2Jsrfebj0avj4mpWAHu6ZXwsJT4VgpIeli~pKzDGgYRUJqdOXUjvDMsGnMpeT4XQmorxylCx14f7JSJ7D5VhBcykebHLhVdzgJpZ5XWGxiYVCoypwSwyL5qeSq1-7x49eTziMAAHco589hlQv4p1AGianh105pn2y78HmMDP0yRptDLw__', isNew: true },
];

export default function Component() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { addToCart } = useCart();
  
  const showMore = () => {
    setVisibleProducts(prevVisible => Math.min(prevVisible + 8, products.length));
  };
    const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity can be 1
      image: product.imageUrl,
    });
  };
  return React.createElement('div', { className: 'bg-white py-16 px-4 sm:px-6 lg:px-8' },
    React.createElement('div', { className: 'max-w-7xl mx-auto' },
      React.createElement('h2', { className: 'text-3xl font-bold text-gray-900 mb-8 text-center' }, 'Our Products'),
      React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' },
        products.slice(0, visibleProducts).map(product => 
          React.createElement('div', { key: product.id, className: 'bg-white rounded-lg overflow-hidden group relative' },
            React.createElement('div', { className: 'relative' },
              React.createElement('img', {
                src: product.image,
                alt: product.name,
                width: 400,
                height: 300,
                className: 'w-full h-[300px] object-cover'
              }),
              product.discount && React.createElement('div', { className: 'absolute top-4 left-4 bg-[#E97171] text-white px-3 py-1 rounded-full text-sm font-semibold' },
                `-${product.discount}%`
              ),
              product.isNew && React.createElement('div', { className: 'absolute top-4 right-4 bg-[#2EC1AC] text-white px-3 py-1 rounded-full text-sm font-semibold' },
                'New'
              ),
              React.createElement('div', { className: 'absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity' },
                React.createElement('button', {
                  className: 'bg-white text-gray-900 px-8 py-3 rounded-md font-bold mb-4 hover:bg-gray-100 transition-colors',
                  onClick: () => handleAddToCart(product), // Add onClick here
                }, 
                  'Add to cart'
                ),
                React.createElement('div', { className: 'flex space-x-4' },
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(Share2, { className: 'h-6 w-6' })
                  ),
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(BarChart2, { className: 'h-6 w-6' })
                  ),
                  React.createElement('button', { className: 'text-white hover:text-gray-200 transition-colors' },
                    React.createElement(Heart, { className: 'h-6 w-6' })
                  )
                )
              )
            ),
            React.createElement('div', { className: 'p-4' },
              React.createElement('h3', { className: 'text-2xl font-semibold text-gray-900 mb-2' }, product.name),
              React.createElement('p', { className: 'text-lg text-gray-500 mb-4' }, product.description),
              React.createElement('div', { className: 'flex items-center justify-between' },
                React.createElement('div', null,
                  React.createElement('span', { className: 'text-2xl font-bold text-gray-900' },
                    `Rs ${product.price.toLocaleString()}`
                  ),
                  product.oldPrice && React.createElement('span', { className: 'ml-2 text-lg text-gray-500 line-through' },
                    `Rs ${product.oldPrice.toLocaleString()}`
                  )
                )
              )
            )
          )
        )
      ),
      visibleProducts < products.length && React.createElement('div', { className: 'mt-12 text-center' },
        React.createElement('button', {
          onClick: showMore,
          className: 'border border-[#B88E2F] bg-[white] text-[#B88E2F] px-10 py-3 rounded-md text-xl font-bold  hover:bg-[#A47E2A] hover:text-[white] transition-colors'
        }, 'Show More')
      )
    )
  );
}