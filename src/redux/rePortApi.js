import { api } from "./api";

export const ReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // product API => get api
    getreports: builder.query({
      query: () => "report/allReports",
      providesTags: ["GETREPORT"],
    }),
  }),
});

export const {
  useGetreportsQuery,
  
} = ReportApi;
