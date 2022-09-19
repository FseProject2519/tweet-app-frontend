import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./App";

import * as Redux from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);

describe("App", () => {
  const mockedState = {
    authReducer: {
      authData: {
        user: {
          userId: "TestId",
        },
      },
    },
  };

  beforeEach(() => {
    Redux.useSelector.mockImplementation((callback) => {
      return callback(mockedState);
    });
  });

  it("App gets rendered without error", () => {
    const store = mockStore({
      user: {},
      authReducer: {
        authData: {},
      },
    });
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
      .dive()
      .dive();
    expect(wrapper.find(".App").length).toEqual(1);
  });
});
