import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "user/allUser",
      providesTags: ["GETALLUSER"],
    }),
    signUp: builder.mutation({
      query(body) {
        return {
          url: "user/signup",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllUserQuery, useSignUpMutation } = userApi;
