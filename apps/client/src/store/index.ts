import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { vacationsReducer } from "./reducers/vacationsReducer";
import { adminReducer } from "./reducers/adminReducer";
import { errorReducer } from "./reducers/errorReducer";
import { loaderReducer } from "./reducers/loaderReducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  authReducer,
  vacationsReducer,
  adminReducer,
  errorReducer,
  loaderReducer
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
  blacklist: ['adminReducer', 'modalReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

