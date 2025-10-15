"use client" // State ka use karne ke liye yeh zaroori hai

import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  // State to manage the mobile menu's open/close state
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // 'relative' zaroori hai taki mobile menu iske hisab se position ho
    <nav className='relative h-16 bg-purple-700 flex justify-between px-4 sm:px-6 items-center text-white'>
      
      {/* Logo */}
      <div className='logo font-bold text-2xl z-20'>
        <Link href="/">BitLinks</Link>
      </div>

      {/* Desktop Menu - Badi screens par dikhega */}
      <ul className='hidden md:flex justify-center gap-6 items-center'>
        <li><Link href="/" className="hover:text-purple-200">Home</Link></li>
        <li><Link href="/about" className="hover:text-purple-200">About</Link></li>
        <li><Link href="/shorten" className="hover:text-purple-200">Shortener</Link></li>
        <li><Link href="/contact" className="hover:text-purple-200">Contact Us</Link></li>
        <li className='flex gap-4'>
          <Link href="/shorten"><button className='bg-purple-500 rounded-lg shadow-lg px-4 py-2 font-bold hover:bg-purple-600'>Try Now</button></Link>
          <Link href="/github"><button className='bg-gray-700 rounded-lg shadow-lg px-4 py-2 font-bold hover:bg-gray-800'>Github</button></Link>
        </li>
      </ul>

      {/* Hamburger Menu Icon - Sirf choti screens par dikhega */}
      <div className="md:hidden flex items-center z-20">
        <button onClick={toggleMenu}>
          {isOpen ? (
            // Close Icon (X)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon (bars)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Hamburger click par dikhega */}
      <ul 
        className={`
          md:hidden absolute top-0 left-0 w-full h-screen bg-purple-700 z-10
          flex flex-col justify-center items-center gap-8 text-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={() => setIsOpen(false)} // Link par click karne par menu band ho jayega
      >
        <li><Link href="/" className="hover:text-purple-200">Home</Link></li>
        <li><Link href="/about" className="hover:text-purple-200">About</Link></li>
        <li><Link href="/shorten" className="hover:text-purple-200">Shortener</Link></li>
        <li><Link href="/contact" className="hover:text-purple-200">Contact Us</Link></li>
        <li className='flex flex-col gap-6 mt-4'>
          <Link href="/shorten"><button className='bg-purple-500 rounded-lg shadow-lg px-6 py-3 font-bold'>Try Now</button></Link>
          <Link href="/github"><button className='bg-gray-700 rounded-lg shadow-lg px-6 py-3 font-bold'>Github</button></Link>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar;