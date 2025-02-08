import React from 'react';
import '../components/styles/sidepanel.css';

const SidePanel = ({ isOpen, toggleSidePanel }) => {
  return (
    <div className='side-panel'
      style={{
        width: isOpen ? '250px' : '0',
        transition: 'width 0.3s',

      }}
    >
      <button onClick={toggleSidePanel} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '10px' }}>
        ✖
      </button>

      <ul>
        <li>Digital Twin</li>
        <li>Analysis & Reports</li>
        <li>User Management</li>
        <li>Product Management</li>
        <li>Settings & Support</li>
      </ul>
    </div>
  );
};

export default SidePanel;
