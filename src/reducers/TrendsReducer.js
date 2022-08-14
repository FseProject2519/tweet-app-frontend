const trendsReducer = (
  state = {
    trends: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "RETREIVING_TREND_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_TREND_SUCCESS":
      return {
        ...state,
        trends: action.data.tweetTrendsList,
        loading: false,
        error: false,
      };
    case "RETREIVING_TREND_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default trendsReducer;
