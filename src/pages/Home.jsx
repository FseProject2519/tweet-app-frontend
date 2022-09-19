import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/ProfileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home" data-test="Home-Test">
      <ProfileSide />
      <PostSide />
      <RightSide location="homePage" />
    </div>
  );
};

export default Home;
