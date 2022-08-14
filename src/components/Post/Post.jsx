import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../Comments/Comments";
import PostShare from "../PostShare/PostShare";
import { UilPen } from "@iconscout/react-unicons";
import { UilTrashAlt } from '@iconscout/react-unicons'
import { deletePost } from "../../actions/PostsAction";

const Post = ({ data, reply_data, location }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState((data.likedBy !== undefined && data.likedBy !== null) ? data.likedBy.includes(user.userId) : false);
  const [likes, setLikes] = useState((data.likedBy !== undefined && data.likedBy !== null) ? data.likedBy.length : 0);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(data.id, user.userId, location));
  };

  const handleLike = () => {
    likePost(data.id, user.userId);
    setLiked(prevLiked => !prevLiked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1)
  };
  return (
    <div className="Post">

      <div className="detail">
        <span><img
          src={
            user.profilePicture
              ? + user.profilePicture
              : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
          }
          alt="ProfileImage"
        />
        </span>
        <span className="name">@{data.createdBy}</span>
        {data.createdBy === user.userId && (
          <span className="name"><UilPen
            width="2rem"
            height="1.2rem"
          // onClick={() => setModalOpened(true)}
          /></span>
        )}
        {data.createdBy === user.userId && (
          <span className="name"><UilTrashAlt
            width="2rem"
            height="1.2rem"
            onClick={handleDelete}
          /></span>
        )}
      </div>

      {data.tweetMessage}


      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <span>
        <PostShare location="comment" postId={data.id} />
      </span>


      <span style={{ color: "var(--gray)", fontSize: "16px" }}>
        Comments
      </span>
      <Comments comments={reply_data} />
    </div>
  );
};

export default Post;
