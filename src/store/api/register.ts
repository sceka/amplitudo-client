import { api } from ".";
import { UserType } from "../../util/types";

const registerApi = api.injectEndpoints({
	endpoints: build => ({
		registerUser: build.mutation<void, any>({
			query: user => ({
				url: "/register",
				method: "POST",
				body: user
			})
		})
	})
});

export const { useRegisterUserMutation } = registerApi;
