import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "user/allUser",
      providesTags: ["GETALLUSER"],
    }),
    logIn: builder.mutation({
      query(body) {
        return {
          url: "user/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLUSER"],
    }),
    signUp: builder.mutation({
      query(body) {
        return {
          url: "user/signup",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLUSER"],
    }),
    userDeleteOne: builder.mutation({
      query(id) {
        return {
          url: `user/deleteOneUser/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETALLUSER"],
    }),
    userUpdate: builder.mutation({
      query(data) {
        // const { updateData } = data;
        // return {
        //   url: `pro/update/${data?._id}`,
        //   method: "PUT",
        //   body: updateData,
        // };
      },
      invalidatesTags: ["GETALLUSER"],
    }),
    userSearch: builder.mutation({
      query(body) {
        return {
          url: "user/userSearch",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETALLUSER"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useLogInMutation,
  useSignUpMutation,
  useUserDeleteOneMutation,
  useUserUpdateMutation,
  useUserSearchMutation,
} = userApi;
