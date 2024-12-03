import { api } from ".";
import { UserType } from "../../util/types";

const searchApi = api.injectEndpoints({
	endpoints: build => ({
		searchUsers: build.query<UserType[], string>({
			query: input => ({
				url: `/search/${input}`,
				method: "GET"
			})
		})
	})
});

export const { useSearchUsersQuery } = searchApi;
