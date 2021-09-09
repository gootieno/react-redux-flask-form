// Import thunk and applyMiddleware
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./users";
//Todo: add user reducer
const rootReducer = combineReducers({
  user: userReducer,
});

let enhancer;

//Todo: add the thunk middleware
if (process.env.NODE_ENV !== "production") {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(logger, thunk));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;