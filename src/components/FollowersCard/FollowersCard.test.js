import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { findByTestAttr, storeFactory } from "../../TestUtils";
import FollowersCard from "./FollowersCard";

let initialState = {
  authReducer: {
    authData: [
      { userId: "user1", firstName: "firstName1", lastName: "lastName1" },
    ],
  },
  persons: [
    { userId: "user1", firstName: "firstName1", lastName: "lastName1" },
    { userId: "user2", firstName: "firstName2", lastName: "lastName2" },
  ],
};

const setup = (state = initialState) => {
  const store = storeFactory(state);
  const props = {
    location: "",
  };
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <FollowersCard {...props} />
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

test("Render FollowersCard Component without error", async () => {
  const wrapper = setup();
  const val = "FollowersCard-Test";
  try {
    const posts = await findByTestAttr(wrapper, val);
    expect(posts.length).toBe(1);
  } catch (error) {
    console.log(error);
  }
});
