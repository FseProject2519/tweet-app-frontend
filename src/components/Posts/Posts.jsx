import React, { useEffect } from "react";
import { getTimelinePosts, getUserPosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = ({ location }) => {
  const params = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    location === "profilePage" ?
      dispatch(getUserPosts(user.userId)) :
      dispatch(getTimelinePosts());
  }, []);
  if (!posts || posts === undefined || posts === null) return <p data-test="Posts">'No Posts'</p>;

  posts = posts.filter((post) => (post !== undefined && post !== null)).sort((a, b) => {
    return new Date(a.createdDateTime).getTime() -
      new Date(b.createdDateTime).getTime()
  }).reverse();


  let filtered_posts = posts.filter((post) => (post.repliedToTweet === undefined || post.repliedToTweet === null));
  return (
    <div className="Posts" data-test="Posts-Test">
      {loading
        ? "Fetching posts...."
        : filtered_posts.map((post, id) => {
          let reply_posts = posts.filter((reply_post) => (reply_post.repliedToTweet === post.id));
          return <Post data={post} reply_data={reply_posts} key={id} location={location} />;
        })}
    </div>
  );
};

export default Posts;
