import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import motorbikeReducer from "./features/motorbikeSlice";
import tourReducer from "./features/tourSlice";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const authPersistConfig = {
  key: "auth",
  storage:
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage(),
  blacklist: ["error"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    motorbike: motorbikeReducer,
    tour: tourReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
