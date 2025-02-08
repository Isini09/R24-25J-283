import React, { useState } from 'react';
import SidePanel from '../../components/SidePanel';
import MainContent from '../../components/MainContent';
import UpperPanel from '../../components/UpperPanel';


const HomePage = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isControllerPanelOpen,setControllerPanelOpen] = useState(false);
  
    const toggleSidePanel = () => {
      setIsSidePanelOpen(!isSidePanelOpen);
    };

    const toggleControllerPanel = () =>{
      setControllerPanelOpen(!isControllerPanelOpen);
    };
  
    return (
      <div>
        <UpperPanel toggleSidePanel={toggleSidePanel} />
        <SidePanel isOpen={isSidePanelOpen} toggleSidePanel={toggleSidePanel} />
        <div style={{ marginLeft: isSidePanelOpen ? '250px' : '0', transition: 'margin-left 0.3s', marginRight: isControllerPanelOpen? '250px':'0', transition: 'margin-right 0.3s' }}>
          <MainContent />
        </div>
      </div>
    );
  };

export default HomePage