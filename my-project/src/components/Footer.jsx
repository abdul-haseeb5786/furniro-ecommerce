import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <footer className="bg-white text-gray-800" style={{  height: '505px' }}>
      <div className="h-full flex flex-col p-16">
        <div className="flex-grow grid grid-cols-4 gap-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Funiro.</h2>
            <p className="text-base text-gray-600 leading-relaxed">
              400 University Drive Suite 200 Coral<br />
              Gables,<br />
              FL 33134 USA
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Links</h3>
            <ul className="space-y-4 text-base">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Help</h3>
            <ul className="space-y-4 text-base">
              <li><a href="/payment" className="hover:underline">Payment Options</a></li>
              <li><a href="/returns" className="hover:underline">Returns</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policies</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-base py-3 px-4 border border-gray-300 rounded"
              />
              <button 
                type="submit" 
                className="w-full text-base py-3 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        <div className="pt-16 mt-16 border-t border-gray-200">
          <p className="text-base text-gray-600">2023 furino. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}