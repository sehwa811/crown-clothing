import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReudcer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && 
  logger,
  thunk,
].filter(Boolean);
//process.env.NODE_ENV === "development" 개발 환경에서만 logger를 작동시킴
//filter : [] 안의 값이 true 일 때에만 추출하여 보여줌

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReudcer,
  undefined,
  composedEnhancers
);
//index.js의 Provider에 전달된 store prop

export const persistor = persistStore(store);
