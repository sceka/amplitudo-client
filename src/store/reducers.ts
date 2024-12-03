import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import roleReducer from "./reducers/roleSlice";

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	role: roleReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
