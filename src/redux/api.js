import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://store-backend-pi-fawn.vercel.app/",
  // baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authentification", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["GETALLCRIDIT", "GETPRODUCT", "SCANER_DATA"],
  endpoints: () => ({}),
});
