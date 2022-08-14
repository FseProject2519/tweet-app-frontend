const userReducer = (
  state = {
    userData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, userData: action.data, loading: false, error: false };
    default:
      return state;
  }
};

export default userReducer;
