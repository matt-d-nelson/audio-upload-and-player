import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
import { takeEvery, put } from "redux-saga/effects";
import createSagaMiddleware from "@redux-saga/core";
import axios from "axios";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";

//---------------------- SAGAS ----------------------//
function* rootSaga() {
  yield takeEvery("ADD_POST", addPost);
  yield takeEvery("GET_POSTS", getPosts);
}

function* addPost(action) {
  console.log(action.payload);
  try {
    const res = yield axios({
      method: "post",
      url: "/audio",
      data: action.payload,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    alert("error adding post");
  }
}

function* getPosts(action) {
  try {
    const res = yield axios({
      method: "get",
      url: "/audio",
    });
    yield put({ type: "SET_POSTS", payload: res.data });
  } catch (err) {
    console.log(err);
    alert("error getting posts");
  }
}

const sagaMiddleware = createSagaMiddleware();

//---------------------- REDUCERS ----------------------//
const posts = (state = [], action) => {
  if (action.type === "SET_POSTS") {
    console.log("in set posts", action.payload);
    state = action.payload;
  }
  return state;
};

const storeInstance = createStore(
  combineReducers({
    posts,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
