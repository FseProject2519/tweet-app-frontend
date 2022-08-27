// import { mount } from "enzyme";
// import React from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import Posts from "./Posts";
// import { findByTestAttr } from "../../TestUtils.js";
// import configureMockStore from "redux-mock-store";
// import thunk from "redux-thunk";
// import * as Redux from "react-redux";

// let initialState = {
//   user: {},
//   posts: [{ id: 123 }],
// };

// const setup = (state = initialState) => {
//   const mockStore = configureMockStore([thunk]);
//   const props = {
//     match: {
//       params: { location: "" },
//     },
//   };
//   const mockedState = {
//     authReducer: {
//       authData: {
//         user: {
//           userId: "TestId",
//         },
//       },
//     },
//     posts: [{ id: 123 }],
//   };

//   beforeEach(() => {
//     Redux.useSelector.mockImplementation((callback) => {
//       return callback(mockedState);
//     });
//   });

//   const store = mockStore({
//     user: {},
//     posts: [{ id: 123 }],
//     authReducer: {
//       authData: {},
//     },
//   });

//   return mount(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Posts {...props} />
//       </BrowserRouter>
//     </Provider>
//   );
// };
// let assignMock = jest.fn();

// delete window.location;
// window.location = { assign: assignMock };

// afterEach(() => {
//   assignMock.mockClear();
// });

// test("Render Posts Component without error", () => {
//   const wrapper = setup();
//   const val = "component-posts";
//   console.log(wrapper.debug());
//   const posts = findByTestAttr(wrapper, val);
//   expect(posts.length).toBe(1);
// });

import Enzyme, { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Posts from "./Posts";
import { findByTestAttr, storeFactory } from "../../TestUtils";

let initialState = {};

const setup = (state = initialState) => {
  const store = storeFactory(state);
  const props = {
    match: {
      params: { location: "" },
    },
  };
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Posts {...props} />
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

test("Render Posts Component without error", () => {
  const wrapper = setup();
  const val = "Posts";
  const posts = findByTestAttr(wrapper, val);
  expect(posts.length).toBe(1);
});
