import React from "react";
import MainContent from "../../components/MainContent";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
