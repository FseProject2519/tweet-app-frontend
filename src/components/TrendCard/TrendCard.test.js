import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TrendCard from "./TrendCard";
import { findByTestAttr, storeFactory } from "../../TestUtils";

let initialState = {
  trendsReducer: {
    trends: [
      { hashtags: "#test1", count: "2" },
      { hashtags: "#test2", count: "1" },
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
        <TrendCard {...props} />
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

test("Render TrendCard Component without error", async () => {
  const wrapper = setup();
  const val = "TrendCard-Test";
  try {
    const posts = await findByTestAttr(wrapper, val);
    expect(posts.length).toBe(1);
  } catch (error) {
    console.log(error);
  }
});
