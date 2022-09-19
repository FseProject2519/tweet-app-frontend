import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { findByTestAttr, storeFactory } from "../../TestUtils";
import PostShare from "./PostShare";

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
    location: "",
  };
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <PostShare {...props} />
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

test("Render PostShare Component without error", async () => {
  const wrapper = setup();
  const val = "PostShare-Test";
  try {
    const posts = await findByTestAttr(wrapper, val);
    expect(posts.length).toBe(1);
  } catch (error) {
    console.log(error);
  }
});
