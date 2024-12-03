import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { api } from ".";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/index";
import { baseQuery } from "../../util/api";

export const authApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<string, { email: string; password: string }>({
			queryFn: (credentials, api, extraOptions) => {
				return baseQuery(
					{ url: "/auth", method: "POST", body: credentials },
					api,
					extraOptions
				) as QueryReturnValue<string, FetchBaseQueryError, undefined>;
			}
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST"
			})
		}),
		getAuthStatus: build.query<{ isAuthenticated: boolean }, void>({
			query: () => ({
				url: "/auth/auth-status",
				method: "GET",
				validateStatus: response =>
					(response.status >= 200 && response.status < 300) || response.status === 401
			}),
			transformResponse: (_response, meta) => ({
				isAuthenticated: meta?.response?.status === 200
			})
		})
	})
});

export const { useLoginMutation, useLogoutMutation, useGetAuthStatusQuery } = authApi;
