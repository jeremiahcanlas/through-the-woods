import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alert";
import userReducer from "./features/user";

//configure store has thunk and devtools already in it
export default configureStore({
  reducer: { alert: alertReducer, user: userReducer },
});
