import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getUserPosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getTrends = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_TREND_START" });
  try {
    const { data } = await PostsApi.getTrends();
    dispatch({ type: "RETREIVING_TREND_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_TREND_FAIL" });
  }
};

export const getTrendingPosts = (hashtags) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTrendingPosts(hashtags);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePost = (id, userId, location) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    await PostsApi.deletePost(id, userId);
    const post_data =
      location === "profilePage"
        ? await PostsApi.getUserPosts(userId)
        : await PostsApi.getTimelinePosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: post_data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const searchPosts = (text) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.searchPosts(text);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
