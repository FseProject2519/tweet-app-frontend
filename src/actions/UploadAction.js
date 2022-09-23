import * as UploadApi from "../api/UploadRequest";
import * as PostApi from "../api/PostsRequests";

export const uploadProfilePicture =
  (userId, profilePicture) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", profilePicture);
      await UploadApi.uploadPicture(userId, formData);
    } catch (error) {
      console.log(error);
    }
  };

export const uploadCoverPicture =
  (userId, coverPicture) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", coverPicture);
      await UploadApi.uploadPicture(userId, formData);
    } catch (error) {
      console.log(error);
    }
  };

export const uploadPost = (data, location, user) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    await UploadApi.uploadPost(data);
    const post_data =
      location === "profilePage"
        ? await PostApi.getUserPosts(user.userId)
        : await PostApi.getTimelinePosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: post_data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const editPost = (data, location, user) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    await UploadApi.editPost(data);
    const post_data =
      location === "profilePage"
        ? await PostApi.getUserPosts(user.userId)
        : await PostApi.getTimelinePosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: post_data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
