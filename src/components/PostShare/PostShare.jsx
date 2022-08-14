import React, { useRef } from "react";
import "./PostShare.css";
import Share from "../../img/share.png";

import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/UploadAction";

const PostShare = ({ location, postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      createdBy: user.userId,
      tweetMessage: desc.current.value,
      tweetTopic: "default topic",
      repliedToTweet: postId
    };
    dispatch(uploadPost(newPost, location, user));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    desc.current.value = "";
  };
  return (
    <div className={location !== "comment" ? "PostShare" : "Comment"}>
      {location !== "comment" && (
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
          }
          alt="Profile"
        />
      )}
      <div>
        <input
          type="text"
          placeholder={location !== "comment" ? "What's happening?" : "Comment..."}
          required
          ref={desc}
        />
      </div>
      <button
        className={location !== "comment" ? "button ps-button" : "comment-button"}
        onClick={handleUpload}
        disabled={loading}
      >
        {(location !== "comment") ?
          loading ? "uploading" : "Share"
          : (
            <img src={Share} alt="" />
          )}
      </button>
    </div>
  );
};

export default PostShare;
