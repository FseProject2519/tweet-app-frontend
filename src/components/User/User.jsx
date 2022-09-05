import React from "react";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className="follower" data-test="User-Test">
      <div>
        <img
          src={
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstName + " " + person.lastName}</span>
          <span>@{person.userId}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
