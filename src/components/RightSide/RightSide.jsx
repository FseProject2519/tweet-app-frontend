import React from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import NavIcons from "../NavIcons/NavIcons";
import ExportPosts from "../ExportPosts/ExportPosts";
const RightSide = ({ location }) => {

  return (
    <div className="RightSide">
      {/* Side Navbar */}

      <NavIcons />
      {/* TrendCard */}

      {location === "homePage" && (
        <TrendCard />
      )}

      {location === "profilePage" && (
        <ExportPosts />
      )}
    </div>
  );
};

export default RightSide;
