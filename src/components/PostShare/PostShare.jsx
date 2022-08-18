import React, { useRef, useState } from "react";
import "./PostShare.css";
import Share from "../../img/share.png";

import { useDispatch, useSelector } from "react-redux";
import { uploadPost, editPost } from "../../actions/UploadAction";

const PostShare = ({ location, postId, oldData, isModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [tweetMsg, setTweetMsg] = useState(oldData ? oldData.tweetMessage : undefined);

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      createdBy: user.userId,
      tweetMessage: tweetMsg,
      tweetTopic: "default topic",
      repliedToTweet: postId
    };
    dispatch(uploadPost(newPost, location, user));
    resetShare();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    //post data
    const newPost = {
      createdBy: user.userId,
      tweetMessage: tweetMsg,
      tweetTopic: oldData.tweetTopic ? oldData.tweetTopic : "default topic",
      repliedToTweet: postId,
      id: oldData.id
    };
    dispatch(editPost(newPost, location, user));
    resetShare();
  };

  const setPostMessage = (msg) => {
    setTweetMsg(msg)
  }

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
          defaultValue={isModal ? tweetMsg : ''}
          required
          ref={desc}
          onChange={event => setPostMessage(event.target.value)}
        />
      </div>
      <button
        className={location !== "comment" ? "button ps-button" : "comment-button"}
        onClick={isModal ? handleEdit : handleUpload}
        disabled={loading}
      >
        {(location !== "comment") ?
          loading ? "uploading" : isModal ? "Edit" : "Share"
          : (
            <img src={Share} alt="" />
          )}
      </button>
    </div>
  );
};

export default PostShare;
