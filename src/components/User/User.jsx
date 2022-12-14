import React, { useState } from "react";
import { useSelector } from "react-redux";

const User = ({ person }) => {
  let images
  try {
    images = importAll(require.context('../../img', false));
  } catch (error) {
    images = undefined
  }
  function importAll(r) {
    return r.keys().map(r);
  }
  const getImage = (type) => {
    if (images !== undefined) {
      for (let img in images) {
        if (("" + images[img]).includes(person.userId + "_" + type)) {
          return images[img]
        }
      }
    }
  }
  const [profilePic, setProfilePic] = useState(getImage("profile") ? getImage("profile") : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg")



  return (
    <div className="follower" data-test="User-Test">
      <div>
        <img
          src={
            profilePic
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
