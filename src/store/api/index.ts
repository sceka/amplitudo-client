import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../../util/api";

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({})
});
