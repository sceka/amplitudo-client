import { api } from ".";
import { UserType } from "../../util/types";

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		getUsers: build.query<
			{ users: UserType[]; totalCount: number },
			{ limit: number; page: number }
		>({
			query: ({ limit = 10, page = 0 }) => {
				const params = new URLSearchParams();
				params.append("limit", limit.toString());
				params.append("page", page.toString());

				return {
					url: `/user/all?${params.toString()}`
				};
			}
		}),
		updateUser: build.mutation<void, UserType>({
			query: user => ({
				url: `/user/${user._id}`,
				method: "PUT",
				body: user
			})
		}),
		deleteUser: build.mutation<void, string>({
			query: userId => ({
				url: `/user/${userId}`,
				method: "DELETE"
			})
		}),
		getUser: build.query<UserType, void>({
			query: () => ({
				url: "/user/",
				method: "GET"
			})
		}),
		createUser: build.mutation<UserType, Partial<UserType>>({
			query: user => ({
				url: "/user/",
				method: "POST",
				body: {
					user
				}
			})
		}),
		createPassword: build.mutation<void, { password: string; userId: string }>({
			query: ({ password, userId }) => ({
				url: "/user/create-password",
				method: "POST",
				body: { password, userId }
			})
		})
	})
});

export const {
	useGetUsersQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetUserQuery,
	useCreateUserMutation,
	useCreatePasswordMutation
} = userApi;
