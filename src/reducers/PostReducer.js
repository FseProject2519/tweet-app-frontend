const postReducer = (
  state = {
    posts: null,
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: action.data.tweetsList,
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        posts: action.data.tweetsList,
        loading: false,
        error: false,
      };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
