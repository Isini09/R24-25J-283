import React from 'react';
import '../components/styles/components.css';
import {Link} from 'react-router-dom';

const UpperPanel = ({ toggleSidePanel }) => {
  return (
    <div className='upper-panel'>
      <button onClick={toggleSidePanel}>
        ☰
      </button>
      
      <ul>
        <li><a href="#view">View</a></li>
        <li><a href="#tools">Tools</a></li>
        <li><a href="#section">Section</a></li>
        <li><Link to='/carbon-footprint-tracking'>CO2 Monitor</Link></li>
      </ul>

      <input type="text" placeholder="Search here" />
      <button style={{ padding: '5px', fontSize:'10px' }}>🔍</button>
    </div>
  );
};

export default UpperPanel;
