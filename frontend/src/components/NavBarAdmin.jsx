import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function NavBarAdmin() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  // Update active item when location changes
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    
    if (currentPath.includes('product-dashboard') || currentPath.includes('product/') || currentPath.includes('add-product')) {
      setActiveItem('products');
    } else if (currentPath.includes('supply-chain') || currentPath.includes('supplier')) {
      setActiveItem('supply-chain');
    } else if (currentPath.includes('user-management') || currentPath.includes('users')) {
      setActiveItem('users');
    } else if (currentPath.includes('admin-dashboard') || currentPath === '/') {
      setActiveItem('dashboard');
    }
  }, [location.pathname]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    {
      id: 'products',
      label: 'Products',
      href: '/product-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    },
    {
      id: 'supply-chain',
      label: 'Supply Chain',
      href: '/supplier',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    },
  ];

  const handleNavClick = (item) => {
    setActiveItem(item.id);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    // For example: clear local storage, redirect to login, etc.
  };

  return (
    <aside className="fixed top-0 left-0 z-50 flex flex-col h-screen text-white border-r shadow-2xl w-60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-green-800/20">
      {/* Logo & Brand */}
      <div className="relative flex items-center gap-3 px-6 py-6 mt-8 mb-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-sm"></div>
          <img src={Logo} alt="Cyber Seeds Logo" className="relative z-10 w-10 h-10" />
        </div>
        <a href="/" className="text-xl font-bold text-transparent transition-all duration-300 hover:text-green-300 bg-gradient-to-r from-white to-green-100 bg-clip-text hover:from-green-300 hover:to-green-200">
          Cyber Seeds
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 px-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              handleNavClick(item);
            }}
            className={`
              group flex items-center gap-3 px-5 py-3 font-normal transition-all duration-300 rounded-md cursor-pointer relative overflow-hidden
              ${activeItem === item.id 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-900/50 border border-green-500/30' 
                : 'hover:bg-gradient-to-r hover:from-green-800/30 hover:to-green-700/30 hover:text-green-200 hover:shadow-md hover:border hover:border-green-600/30'
              }
            `}
          >
            {/* Active indicator line */}
            {activeItem === item.id && (
              <div className="absolute top-0 left-0 w-1 h-full rounded-r-full bg-gradient-to-b from-green-300 to-green-500"></div>
            )}
            
            {/* Background glow effect */}
            <div className={`
              absolute inset-0 transition-opacity duration-300
              ${activeItem === item.id 
                ? 'bg-gradient-to-r from-green-400/10 to-green-600/10 opacity-100' 
                : 'bg-gradient-to-r from-green-400/5 to-green-600/5 opacity-0 group-hover:opacity-100'
              }
            `}></div>
            
            <div className={`
              relative z-10 transition-all duration-300
              ${activeItem === item.id ? 'text-green-100 drop-shadow-sm' : 'group-hover:scale-110'}
            `}>
              {item.icon}
            </div>
            
            <span className="relative z-10 text-[15px]">{item.label}</span>
            
            {/* Hover arrow */}
            <svg 
              className={`
                w-4 h-4 ml-auto transition-all duration-300 relative z-10
                ${activeItem === item.id 
                  ? 'opacity-100 translate-x-0 text-green-200' 
                  : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 text-green-300'
                }
              `}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-3 px-5 py-3 mt-10 overflow-hidden font-normal text-left transition-all duration-300 rounded-md cursor-pointer group hover:bg-gradient-to-r hover:from-red-800/30 hover:to-red-700/30 hover:text-red-300 hover:shadow-md hover:border hover:border-red-600/30"
        >
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-red-400/5 to-red-600/5 group-hover:opacity-100"></div>
          
          <div className="relative z-10 transition-all duration-300 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </div>
          
          <span className="relative z-10 text-[15px]">Logout</span>
          
          <svg 
            className="relative z-10 w-4 h-4 ml-auto text-red-300 transition-all duration-300 translate-x-2 opacity-0 group-hover:opacity-70 group-hover:translate-x-0"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </aside>
  );
}

export default NavBarAdmin;