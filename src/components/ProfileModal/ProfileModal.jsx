import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadProfilePicture, uploadCoverPicture } from "../../actions/UploadAction";
import { getUser } from "../../actions/UserAction";
import * as AuthApi from "../../api/AuthRequests"

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch();

  const getErrors = () => {
    console.log(errors)
    if (errors != null) {
      return (
        <div>
          <h6 className="validationListHeader">ERRORS</h6>
          <ol className="validationList">{
            errors.map(function (e, id) {
              return (
                <li key={id}>
                  {e.message}
                </li>
              )
            })}
          </ol>
        </div>
      )
    }
    else return null
  }

  const user = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let suffix = event.target.name === "profileImage"
        ? "_profile"
        : "_cover";
      let name_split = event.target.files[0].name.split(".")
      let extension = name_split[name_split.length - 1]
      const img = new File([event.target.files[0]], user.userId + suffix + "." + extension);
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isImageUpdate = false
    try {
      await AuthApi.updateUser(user.userId, formData)
      setIsError(false)
      setIsSuccess(true)
      isImageUpdate = true
    } catch (error) {
      if (error.response.data !== undefined && error.response.data !== null) {
        setErrors(error.response.data)
        setIsError(true)
        setIsSuccess(false);
      }
    }
    if (isImageUpdate) {
      if (profileImage) {
        try {
          dispatch(uploadProfilePicture(user.userId, profileImage));
        } catch (err) {
          console.log(err);
          setIsSuccess(false);
        }
      }
      if (coverImage) {
        try {
          console.log(coverImage)
          dispatch(uploadCoverPicture(user.userId, coverImage));
        } catch (err) {
          console.log(err);
          setIsSuccess(false);
        }
      }
    }
    let images

    if (profileImage || coverImage) {
      try {
        images = importAll(require.context('../../img', false));
      } catch (error) {
        images = undefined
      }
      dispatch({ type: "UPDATE_IMAGES", data: images });
    }

    dispatch(getUser(user.userId));
  };

  function importAll(r) {
    return r.keys().map(r);
  }


  return (
    <Modal data-test="ProfileModal-Test"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => {
        setFormData(other);
        setErrors(null);
        setIsError(false);
        setIsSuccess(false);
        setModalOpened(false);
        window.location.reload();
      }}
    >
      <div className="totalForm">
        <form className="infoForm" onSubmit={handleSubmit}>
          <h3 className="formTitle">Your Info</h3>
          <h6 className={isSuccess ? "successVisible" : "successHidden"}>Updated Successfully!</h6>
          <div>
            <input
              value={formData.userId}
              onChange={handleChange}
              type="text"
              placeholder="User Id"
              name="userid"
              className="infoInput"
              readonly
            />
            <input
              value={formData.updatePassword}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="updatePassword"
              className="infoInput"
            />
          </div>
          <div>
            <input
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstName"
              className="infoInput"
            />
            <input
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={formData.email}
              onChange={handleChange}
              type="text"
              placeholder="e-Mail"
              name="email"
              className="infoInput"
              readonly
            />
            <input
              value={formData.contactNumber}
              onChange={handleChange}
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              className="infoInput"
            />
          </div>

          <div>
            Profile image
            <input type="file" name="profileImage" onChange={onImageChange} accept="image/jpg" />
            Cover image
            <input type="file" name="coverImage" onChange={onImageChange} accept="image/jpg" />
          </div>

          <button className="button infoButton" type="submit">
            Update
          </button>
        </form>
        <div className={isError ? "validationMsgVisible" : "validationMsgHidden"}>
          {getErrors()}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
