import * as AuthApi from "../api/AuthRequests";
import * as UserApi from "../api/UserRequests";
export const logIn = (data, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    dispatch({ type: "AUTH_SUCCESS", data: data.data.usersList[0] });
    navigate("../home", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    throw error;
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthApi.logOut();
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "LOG_OUT" });
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await UserApi.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "LOG_OUT" });
};
