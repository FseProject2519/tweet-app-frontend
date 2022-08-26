import React from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts)
  const postCountsPosts = posts
  const commentCountsPosts = posts

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : "https://amdmediccentar.rs/wp-content/plugins/uix-page-builder/includes/uixpbform/images/default-cover-4.jpg"
        } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstName} {user.lastName}</span>
        <span>{user.userId}</span>
      </div>

      <div className="followStatus">

        <div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="follow">
                <span>{
                  postCountsPosts.filter((post) => post.createdBy === user.userId && (post.repliedToTweet === undefined || post.repliedToTweet === null)).length
                }</span>
                <span>Posts</span>
              </div>{" "}
              <div className="follow">
                <span>{
                  commentCountsPosts.filter((post) => post.createdBy === user.userId && (post.repliedToTweet !== undefined && post.repliedToTweet !== null)).length
                }</span>
                <span>Comments</span>
              </div>{" "}
            </>
          )}
        </div>

      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
