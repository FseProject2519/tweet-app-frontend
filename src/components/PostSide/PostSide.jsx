import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";

const PostSide = ({ location }) => {
  return (
    <div className="PostSide" data-test="PostSide-Test">
      <PostShare location={location} isModal={false} />
      <Posts location={location} />
    </div>
  );
};

export default PostSide;
