import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteUser } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";

const InfoCard = () => {
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const user = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch()

  const handleClickDelete = () => {
    dispatch(deleteUser(user.userId))
  }

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure you want to delete your account?</h1>
            <p>Account cannot be retrieved once deleted!</p>
            <button
              onClick={() => {
                handleClickDelete();
                onClose();
              }}
              className="delete-confirm-button"
            >
              Yes
            </button>
            <button onClick={onClose} className="not-delete-confirm-button">No</button>
          </div>
        );
      }
    });
  }

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.userId) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard" data-test="InfoCard-Test">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user.userId === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Handle: </b>
        </span>
        <span>{"@" + profileUser.userId}</span>
      </div>
      <div className="info">
        <span>
          <b>Name: </b>
        </span>
        <span>{profileUser.firstName + " " + profileUser.lastName}</span>
      </div>
      <div className="info">
        <span>
          <b>e-Mail: </b>
        </span>
        <span>{profileUser.email}</span>
      </div>
      <div className="info">
        <span>
          <b>Contact Number: </b>
        </span>
        <span>{profileUser.contactNumber}</span>
      </div>
      <button className="button delete-button" onClick={() => handleDelete()}>Delete Account</button>
    </div>
  );
};

export default InfoCard;
