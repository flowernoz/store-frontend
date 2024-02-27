import { api } from "./api";

export const ReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // product API => get api
    getreports: builder.query({
      query: () => "report/allReports",
      providesTags: ["GETREPORT"],
      invalidatesTags: ["GETREPORT"],
    }),

    soldProducts: builder.mutation({
      query(body) {
        return {
          url: `soldPro/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETREPORT"],
    }),

    quantityUpdate: builder.mutation({
      query(body) {
        return {
          url: `product/updateQty`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["GETREPORT"],
    }),
  }
  ),
});

export const {
  useGetreportsQuery,
  useSoldProductsMutation,
  useQuantityUpdateMutation
} = ReportApi;
