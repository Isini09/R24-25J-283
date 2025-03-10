import React from "react";
import '../index.css'
import logo from '../images/logo.png'


const Footer = () => {
  return (
    
   <div className="flex flex-col w-screen px-6 py-1 bg-white">
    <ul className="flex justify-end m-5 gap-9">
      <li className="font-mono text-2xl font-semibold text-green-600 grow">Cyber Seeds</li>
      <li className="font-thin hover:text-green-600">Home</li>
      <li className="font-thin hover:text-green-600">Product History</li>
      <li className="font-thin hover:text-green-600">Contact Us</li>
      <li><a herf="#" className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">Sign In</a></li>
      <li><a herf="#"className="px-6 py-2 border border-green-700 rounded-md hover:bg-green-600 hover:text-white">Sign Up</a></li>
    </ul>
   </div>
  );
};

export default Footer;
