import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../util/types";

interface UserInterfance {
	users: UserType[];
}

const initialState: UserInterfance = {
	users: []
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<UserType[]>) => {
			state.users = action.payload;
		},
		removeUsers: state => {
			state.users = [];
		}
	}
});
