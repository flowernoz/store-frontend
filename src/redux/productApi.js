import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // product API => get api
    getAllProducts: builder.query({
      query: () => "pro/allProducts",
      providesTags: ["GETPRODUCT"],
    }),

    getPopularProducts: builder.query({
      query: () => "soldPro/popular",
      providesTags: ["GETPRODUCT"],
    }),

    addProduct: builder.mutation({
      query(body) {
        return {
          url: `pro/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),
    // product update api =>
    productUpdate: builder.mutation({
      query(data) {
        const { updateData } = data;
        return {
          url: `pro/update/${data?._id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),

    // product delete api =>

    deleteOneProduct: builder.mutation({
      query(id) {
        return {
          url: `pro/delete/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETPRODUCT"],
    }),

    // delete all product api =>

    deleteAllProducts: builder.mutation({
      query() {
        return {
          url: `pro/deleteAllData`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETPRODUCT"],
    }),

    // POST => SEARCH PRODICT DATA
    searchPost: builder.mutation({
      query(body) {
        return {
          url: `pro/search`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useProductUpdateMutation,
  useDeleteOneProductMutation,
  useDeleteAllProductsMutation,
  useSearchPostMutation,
  useGetPopularProductsQuery,
} = productsApi;
