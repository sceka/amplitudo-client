import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { api } from "./api";

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
	devTools: process.env.NODE_ENV === "development"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
