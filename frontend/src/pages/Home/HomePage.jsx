import React from "react";
import MainContent from "../../components/MainContent";
import UpperPanel from "../../components/UpperPanel";

const HomePage = () => {
  return (
    <div>
      <UpperPanel/>
    <div
      style={{
        marginLeft: "0",
        transition: "margin-left 0.3s",
        marginRight: "0",
        transition: "margin-right 0.3s",
      }}
    >
      <MainContent />
    </div>
    </div>
  );
};

export default HomePage;
