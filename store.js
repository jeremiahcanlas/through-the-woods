import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import alertReducer from "./features/alert";
import userReducer from "./features/user";

const reducers = combineReducers({
  alert: alertReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//configure store has thunk and devtools already in it
export default configureStore({
  reducer: persistedReducer,
});
