const imageReducer = (
  state = {
    images: null,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_IMAGES":
      return { ...state, images: action.data };
    default:
      return state;
  }
};

export default imageReducer;
