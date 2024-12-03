import { api } from ".";

export const linkFormApi = api.injectEndpoints({
	endpoints: build => ({
		checkLinkForm: build.query<void, string | null>({
			query: userId => ({
				url: `/form/check-link/${userId}`,
				method: "GET"
			})
		})
	})
});

export const { useCheckLinkFormQuery } = linkFormApi;
