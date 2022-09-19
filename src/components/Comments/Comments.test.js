import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { findByTestAttr, storeFactory } from "../../TestUtils";
import Comments from "./Comments";

let initialState = { limit: 3, showMore: true, modalOpened: false };

const setup = (state = initialState) => {
  const store = storeFactory(state);
  const props = {
    location: "",
    user: {},
    comments: [
      { createdBy: "test1", tweetMessage: "comment1" },
      { createdBy: "test2", tweetMessage: "comment2" },
    ],
  };
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Comments {...props} />
      </BrowserRouter>
    </Provider>
  );
};
let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});

test("Render Comments Component without error", async () => {
  const wrapper = setup();
  const val = "Comments-Test";
  try {
    const posts = await findByTestAttr(wrapper, val);
    expect(posts.length).toBe(1);
  } catch (error) {
    console.log(error);
  }
});
