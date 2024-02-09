import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["GETPRODUCT"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/pro/allProducts",
      providesTags: ["GETPRODUCT"],
    }),

    addPost: builder.mutation({
      query(body) {
        return {
          url: `/pro/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),

    updatePost: builder.mutation({
      query(data) {
        const { updateData } = data;
        return {
          url: `/pro/update/${data?._id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),

    deletePost: builder.mutation({
      query(id) {
        return {
          url: `/pro/delete/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation,
} = productsApi;
