import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  GET => CREDIT DATA
    getAllCriditData: builder.query({
      query: () => "creditUser/creditUsers",
      providesTags: ["GETALLCRIDIT"],
    }),

    // GET => FINISHED DATA

    finishedCredit: builder.query({
      query: () => "creditUser/getFinishedData",
      providesTags: ["GETFINISHEDCRIDIT"],
    }),

    // CREDIT CREATE USER

    creditCreateUser: builder.mutation({
      query(body) {
        return {
          url: "creditUser/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLCRIDIT", "GETFINISHEDCRIDIT"],
    }),

    creditUserDeleteOne: builder.mutation({
      query(id) {
        return {
          url: `creditUser/deleteOneUser/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETALLCRIDIT", "GETFINISHEDCRIDIT"],
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
      invalidatesTags: ["GETALLCRIDIT", "GETFINISHEDCRIDIT"],
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
      invalidatesTags: ["GETALLCRIDIT", "GETFINISHEDCRIDIT"],
    }),

    // PUT => UPDATE CREDIT USER

    updateCreditUser: builder.mutation({
      query(data) {
        return {
          url: `creditUser/updateCreditUser/${data?._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["GETALLCRIDIT", "GETREPORT", "GETFINISHEDCRIDIT"],
    }),

    creditUserSearch: builder.mutation({
      query(body) {
        return {
          url: `creditUser/creditUserSearch`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLCRIDIT", "GETFINISHEDCRIDIT"],
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
  useFinishedCreditQuery,
  useCreditUserSearchMutation,
} = productApi;
