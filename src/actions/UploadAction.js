import * as UploadApi from "../api/UploadRequest";
import * as PostApi from "../api/PostsRequests";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data);
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
