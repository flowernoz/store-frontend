import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  GET => CREDIT DATA
    getAllCriditData: builder.query({
      query: () => "creditUser/creditUsers",
      providesTags: ["GETALLCRIDIT"],
    }),

    // CRIDIT CREATE USER

    creditCreateUser: builder.mutation({
      query(body) {
        return {
          url: `creditUser/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLCRIDIT"],
    }),

    creditUserDeleteOne: builder.mutation({
      query(id) {
        return {
          url: `creditUser/delete/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETALLCRIDIT"],
    }),

    //   POST => CREDIT FIND USER
    soldCriditFintUser: builder.mutation({
      query(body) {
        let id = body;
        return {
          url: `creditUser/soldCreditFindUser/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLCRIDIT"],
    }),

    //  POST => CREDIT REGISTER FIND USER
    creditFindRegister: builder.mutation({
      query(body) {
        return {
          url: `creditUser/creditFindRegister`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLCRIDIT"],
    }),

    // PUT => UPDATE CREDIT USER

    updateCreditUser: builder.mutation({
      query(body) {
        let { id, data } = body;
        return {
          url: `creditUser/updateCreditUser/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreditFindRegisterMutation,
  useCreditCreateUserMutation,
  useCreditUserDeleteOneMutation,
  useSoldCriditFintUserMutation,
  useGetAllCriditDataQuery,
  useUpdateCreditUserMutation,
} = productApi;
