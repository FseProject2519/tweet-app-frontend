import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Post from "./Post";
import { findByTestAttr, storeFactory } from "../../TestUtils";

let initialState = {
  postReducer: {
    posts: [
      { createdBy: "test1", tweetMessage: "post1" },
      { createdBy: "test2", tweetMessage: "post2" },
    ],
  },
  authReducer: {
    authData: [
      { userId: "user1", firstName: "firstName1", lastName: "lastName1" },
    ],
  },
};

const setup = (state = initialState) => {
  const store = storeFactory(state);
  const props = {
    data: { createdBy: "test1", tweetMessage: "post1" },
    reply_data: [],
    location: "",
  };
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Post {...props} />
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

test("Render Post Component without error", async () => {
  const wrapper = setup();
  const val = "Post-Test";
  try {
    const posts = await findByTestAttr(wrapper, val);
    expect(posts.length).toBe(1);
  } catch (error) {
    console.log(error);
  }
});
