import React from 'react';
import '../components/styles/sidepanel.css';
import {Link} from 'react-router-dom'

const SidePanel = ({ isOpen, toggleSidePanel }) => {
  return (
    <div className='side-panel bg-gradient-to-b from-green-950 to-green-900 via-green-900'
      style={{
        width: isOpen ? '250px' : '0',
        transition: 'width 0.3s',

      }}
    >
      <button onClick={toggleSidePanel} className='px-5 py-3 font-bold text-white'>
        X
      </button>

      <ul>
        <li>Digital Twin</li>
        <li>User Management</li>
        <li><Link to='/product-dashboard'>Digital Product Passport</Link></li>
        <li>Settings & Support</li>
      </ul>
    </div>
  );
};

export default SidePanel;
