import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("Home");

  // Navigation items with their routes
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Digital Product Passport", path: "/userview" },
    { name: "Digital Twin", path: "/" },
    { name: "Harvest Model", path: "/" }
  ];

  // Check if current path matches the nav item
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-black/70 backdrop-blur-md">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-emerald-900/10"></div>
      
      <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 shadow-lg rounded-xl">
              <span className="text-lg font-bold text-white">
                <img src={Logo} alt="Cyber Seeds Logo" />
              </span>
            </div>
            <div className="font-mono text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text">
              Cyber Seeds
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-6 py-2 rounded-full font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? "text-green-400 bg-green-500/10 shadow-lg shadow-green-500/25"
                    : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                }`}
                onClick={() => setActive(item.name)}
              >
                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute inset-0 border rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30"></div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 transition-all duration-300 rounded-full bg-green-400/0 group-hover:bg-green-400/5"></div>
                
                <span className="relative z-10">{item.name}</span>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-300 ${
                  isActive(item.path) ? "w-8" : "w-0 group-hover:w-6"
                }`}></div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="border-t lg:hidden border-green-500/20 bg-gray-900/50 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-green-400 bg-green-500/20"
                    : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
    </div>
  );
};

export default Navbar;