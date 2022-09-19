import * as UserApi from "../api/UserRequests";

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};

export const getUser = (authData, navigate) => async (dispatch) => {
  const { data } = await UserApi.getUser(authData);
  dispatch({ type: "AUTH_SUCCESS", data: data.usersList[0] });
};
