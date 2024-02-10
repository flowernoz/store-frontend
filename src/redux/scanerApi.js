import { api } from "./api";

export const scanerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // POST => SCANER GET DATA
    getScanerData: builder.mutation({
      query(body) {
        return {
          url: `pro/scan`,
          method: "POST",
          body,
        };
      },
      providesTags: ["SCANER_DATA"],
    }),
  }),
});

export const { useGetScanerDataMutation } = scanerApi;
