import React from "react";
import "../components/styles/components.css";
import { Link } from "react-router-dom";

const UpperPanel = () => {
  return (
    <div className="upper-panel bg-gradient-to-b from-green-950 to-green-900 via-green-900">
      <ul>
        <li>
          <Link to="/">View</Link>
        </li>
        <li>
          <a href="#tools">Tools</a>
        </li>
        <li>
          <Link to="/product-dashboard">Digital Product Passport</Link>
        </li>

        <li>
          <Link to="/carbon-footprint-tracking">CO2 Monitor</Link>
        </li>
        <li>
          <Link to="/harvest">Harvest</Link>
        </li>
        <li>
          <Link to="/yield">Yield Prediction</Link>
        </li>
      </ul>

      <input type="text" placeholder="Search here" />
      <button style={{ padding: "5px", fontSize: "10px" }}>🔍</button>
    </div>
  );
};

export default UpperPanel;
