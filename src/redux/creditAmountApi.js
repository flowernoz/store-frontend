import { api } from "./api";

export const creditAmountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCreditAmountUsers: builder.query({
      query: () => "creditAmount/allCreditAmount",
      providesTags: ["GETALLAMOUNTUSER"],
    }),
    createAmountCredit: builder.mutation({
      query(body) {
        return {
          url: "creditAmount/createAmount",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLAMOUNTUSER"],
    }),
    chackUserDeleteOne: builder.mutation({
      query(body) {
        let { id } = body;
        return {
          url: `creditAmount/chackUserDeleteOne/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["GETALLAMOUNTUSER"],
    }),
    findUserChack: builder.mutation({
      query(body) {
        return {
          url: "creditAmount/findUserChack",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLAMOUNTUSER"],
    }),
  }),
});

export const {
  useGetCreditAmountUsersQuery,
  useCreateAmountCreditMutation,
  useChackUserDeleteOneMutation,
  useFindUserChackMutation,
} = creditAmountApi;
