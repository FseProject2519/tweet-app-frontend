import { UilPen, UilTrashAlt } from "@iconscout/react-unicons";
import _clone from 'lodash/clone';
import moment from 'moment';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getTrendingPosts, getTrends, getUserPosts } from "../../actions/PostsAction";
import { likePost } from "../../api/PostsRequests";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Comments from "../Comments/Comments";
import PostShare from "../PostShare/PostShare";
import ShareModal from "../ShareModal/ShareModal";
import "./Post.css";

const Post = ({ data, reply_data, location }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState((data.likedBy !== undefined && data.likedBy !== null) ? data.likedBy.includes(user.userId) : false);
  const [likes, setLikes] = useState((data.likedBy !== undefined && data.likedBy !== null) ? data.likedBy.length : 0);
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(data.id, user.userId, location));
    dispatch(getTrends());
  };

  const handleLike = () => {
    likePost(data.id, user.userId);
    setLiked(prevLiked => !prevLiked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1)
  };


  const swapHashTags = (text) => {
    let displayText = _clone(text)
    let words = displayText.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,50})(\b|\r)/gi.test(words[i])) {
        words[i] = createTag(words[i])
      }
      else if (/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_]{1,50})(\b|\r)/gi.test(words[i])) {
        words[i] = createTag(words[i])
      }
    }
    return words
  }

  const createTag = (text) => {
    var dom = document.createElement('div');
    dom.innerHTML = text;
    return dom;
  }

  const handleTagClick = (tag) => {
    if (/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(tag)) {
      dispatch(getUserPosts(tag.substring(1)))
    } else if (/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(tag)) {
      dispatch(getTrendingPosts(tag.substring(1)))
    }

  }
  const getMoment = (timestamp) => {
    return moment(timestamp).fromNow();
  }

  return (
    <div className="Post" data-test="Post-Test">

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
            onClick={() => setModalOpened(true)}
          />
            <ShareModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              oldData={data}
              location={location}
            />
          </span>
        )}
        {data.createdBy === user.userId && (
          <span className="name"><UilTrashAlt
            width="2rem"
            height="1.2rem"
            onClick={handleDelete}
          /></span>
        )}
        <span className="timestamp">{
          getMoment(data.createdDateTime)
        }
        </span>
      </div>
      <div>
        {swapHashTags(data.tweetMessage).map(message => {
          if (typeof message === 'string') {
            return message + " "
          }
          else {
            return <button onClick={() => { handleTagClick(message.innerHTML) }} className='tag'>{message.innerHTML}{'\u00A0'}</button>
          }
        })}

      </div>
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
        <PostShare location="comment" postId={data.id} isModal={false} />
      </span>


      <span style={{ color: "var(--gray)", fontSize: "16px" }}>
        Comments
      </span>
      <Comments comments={reply_data} location={location} user={user} dispatch={dispatch} />
    </div>
  );
};

export default Post;
