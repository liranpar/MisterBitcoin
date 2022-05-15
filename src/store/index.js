import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { contactReducer } from "./reducers/contactReducer";
import { userReducer } from "./reducers/userReducer";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  contactModule: contactReducer,
  userModule: userReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

window.myStore = store;
