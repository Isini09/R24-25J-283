import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const UpperPanel = () => {
  const [activeItem, setActiveItem] = useState('view');
  const [searchValue, setSearchValue] = useState('');

  // Determine active item based on current URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      setActiveItem('view');
    } else if (currentPath.includes('admin-dashboard')) {
      setActiveItem('digital-passport');
    } else if (currentPath.includes('carbon-footprint-tracking')) {
      setActiveItem('co2-monitor');
    } else if (currentPath.includes('harvest')) {
      setActiveItem('harvest');
    } else if (currentPath.includes('tools')) {
      setActiveItem('tools');
    }
  }, []);

  const navItems = [
    {
      id: 'view',
      label: 'View',
      path: '/',
      type: 'link'
    },
    {
      id: 'tools',
      label: 'Tools',
      path: '#tools',
      type: 'anchor'
    },
    {
      id: 'digital-passport',
      label: 'Digital Product Passport',
      path: '/admin-dashboard',
      type: 'link'
    },
    {
      id: 'co2-monitor',
      label: 'CO2 Monitor',
      path: '/carbon-footprint-tracking',
      type: 'link'
    },
    {
      id: 'harvest',
      label: 'Harvest',
      path: '/harvest',
      type: 'link'
    },
    {
      id: 'yield',
      label: 'Yield Prediction',
      path: '/yield',
      type: 'link'
    }
  ];

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b shadow-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-green-800/20 backdrop-blur-sm">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-sm"></div>
          <img src={Logo} alt="Cyber Seeds Logo" className="relative z-10 w-10 h-10" />
        </div>
        <Link 
          to="/" 
          className="text-xl font-bold text-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-100 bg-clip-text hover:from-green-300 hover:to-green-200 hover:scale-105"
        >
          Cyber Seeds
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-2 text-sm">
        {navItems.map((item) => {
          const Component = item.type === 'link' ? Link : 'a';
          const linkProps = item.type === 'link' 
            ? { to: item.path } 
            : { href: item.path };

          return (
            <Component
              key={item.id}
              {...linkProps}
              onClick={() => setActiveItem(item.id)}
              className={`
                relative px-4 py-2 transition-all duration-300 rounded-lg group overflow-hidden
                ${activeItem === item.id 
                  ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg shadow-green-900/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-800/30 hover:to-green-700/30'
                }
              `}
            >
              {/* Background glow effect */}
              <div className={`
                absolute inset-0 transition-opacity duration-300
                ${activeItem === item.id 
                  ? 'bg-gradient-to-r from-green-400/10 to-green-600/10 opacity-100' 
                  : 'bg-gradient-to-r from-green-400/5 to-green-600/5 opacity-0 group-hover:opacity-100'
                }
              `}></div>
              
              {/* Active indicator */}
              {activeItem === item.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-green-300 to-green-500 rounded-full"></div>
              )}
              
              <span className="relative z-10 font-medium">{item.label}</span>
            </Component>
          );
        })}
      </nav>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-1 border bg-white/10 backdrop-blur-sm rounded-xl border-green-800/20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-48 px-4 py-2 text-sm text-gray-800 placeholder-gray-500 transition-all duration-300 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        
        <button className="p-2 text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:scale-105 group">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="text-sm transition-transform duration-200 group-hover:scale-110" 
          />
        </button>
      </div>
    </header>
  );
};

export default UpperPanel;