import React, { useState, useEffect } from "react";
import "./PostShare.css";
import Share from "../../img/share.png";
import { getAllUser } from "../../api/UserRequests";
import { getHashtags } from "../../api/PostsRequests";
import { getTrends } from "../../actions/PostsAction";

import { useDispatch, useSelector } from "react-redux";
import { uploadPost, editPost } from "../../actions/UploadAction";
import { MentionsInput, Mention } from 'react-mentions'
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'

const PostShare = ({ location, postId, oldData, isModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [tweetMsg, setTweetMsg] = useState(oldData ? oldData.tweetMessage : "");
  const [persons, setPersons] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const swapUserTags = (text) => {
    let displayText = _clone(text)
    const tags = text.match(/@\{\{[^\}]+\}\}/gi) || []
    tags.map(myTag => {
      const tagData = myTag.slice(3, -2)
      const tagDataArray = tagData.split('||')
      const tagDisplayValue = tagDataArray[1]
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
    })
    return displayText
  }

  const swapHashTags = (text) => {
    let displayText = _clone(text)
    const tags = text.match(/#\{\{[^\}]+\}\}/gi) || []
    tags.map(myTag => {
      const tagData = myTag.slice(3, -2)
      const tagDataArray = tagData.split('||')
      const tagDisplayValue = tagDataArray[1]
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
    })
    return displayText
  }


  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.usersList);
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    const fetchHashtags = async () => {
      const { data } = await getHashtags();
      setHashtags(data.hashtagsList);
    };
    fetchHashtags();
  }, []);


  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();
    let msg = tweetMsg
    if (tweetMsg.includes("@")) {
      msg = swapUserTags(tweetMsg)
      setTweetMsg(msg)
    }
    if (tweetMsg.includes("#")) {
      msg = swapHashTags(msg)
      setTweetMsg(msg)
    }
    //post data
    const newPost = {
      createdBy: user.userId,
      tweetMessage: msg,
      tweetTopic: "default topic",
      repliedToTweet: postId
    };
    dispatch(uploadPost(newPost, location, user));
    dispatch(getTrends());
    resetShare();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    //post data
    let editmsg = tweetMsg
    if (tweetMsg.includes("@")) {
      editmsg = swapUserTags(tweetMsg)
      setTweetMsg(editmsg)
    }
    if (tweetMsg.includes("#")) {
      editmsg = swapHashTags(editmsg)
      setTweetMsg(editmsg)
    }
    const newPost = {
      createdBy: user.userId,
      tweetMessage: editmsg,
      repliedToTweet: postId,
      id: oldData.id
    };
    dispatch(editPost(newPost, location, user));
    dispatch(getTrends());
    resetShare();
  };

  const setPostMessage = (message) => {
    setTweetMsg(message)

  }

  // Reset Post Share
  const resetShare = () => {
    setTweetMsg("");
  };

  const userMentionData = persons.map(myUser => ({
    id: myUser.userId,
    display: `@${myUser.userId}`
  }));

  const hashtagMentionData = hashtags.map(hashtag => ({
    id: hashtag,
    display: `#${hashtag}`
  }));

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
      <MentionsInput
        value={tweetMsg}
        onChange={event => setPostMessage(event.target.value)}
        placeholder={location !== "comment" ? "What's happening?" : "Comment..."}
        className="mentions"

      >
        <Mention
          type="user"
          trigger="@"
          data={userMentionData}
          className="mentions__mention"
          markup="@{{__id__||__display__}}"
        />

        <Mention
          type="hashtag"
          trigger="#"
          data={hashtagMentionData}
          className="mentions__mention"
          markup="#{{__id__||__display__}}"
        />
      </MentionsInput>
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
