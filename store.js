import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import alertReducer from "./features/alert";
import userReducer from "./features/user";

const reducers = combineReducers({
  alert: alertReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // storage: AsyncStorage,
  // stateReconciler: hardSet, //so redux-persist doesnt fail and take storage back to the ice age(noop)
};

const persistedReducer = persistReducer(persistConfig, reducers);

//configure store has thunk and devtools already in it
export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
