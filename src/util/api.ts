import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ExtraOptions = Record<string, unknown>;

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BACKEND_API_URL,
	credentials: "include",
	responseHandler: "content-type"
});

export const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: ExtraOptions
) => {
	let mainResponse = await baseQuery(args, api, extraOptions);

	if (mainResponse.meta?.response?.status === 401) {
		const refreshTokenResponse = await baseQuery({ url: "/auth/refresh" }, api, extraOptions);
		if (refreshTokenResponse.data === "OK") {
			mainResponse = await baseQuery(args, api, extraOptions);
		}
	}

	return mainResponse;
};
