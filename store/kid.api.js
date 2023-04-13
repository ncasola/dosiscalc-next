import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kidApi = createApi({
  reducerPath: "kidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Kid"],
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    getKids: builder.query({
      query: () => "/kids",
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Kid", id })),
              { type: "Kid", id: "LIST" },
            ]
          : [{ type: "Kid", id: "LIST" }],
    }),
    getKid: builder.query({
      query: (id) => `/kids/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Kid", id: result.id }] : [],
    }),
    createKid: builder.mutation({
      query: (newKid) => ({
        url: "/kids",
        method: "POST",
        body: newKid,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Kid", id: "LIST" }],
    }),
    updateKid: builder.mutation({
      query: ({ id, data }) => ({
        url: `/kids/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Kid", id: arg.id }],
    }),
    deleteKid: builder.mutation({
      query: (id) => ({
        url: `/kids/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Kid", id: arg }],
    }),
  }),
});

export const {
  useGetKidsQuery,
  useGetKidQuery,
  useCreateKidMutation,
  useUpdateKidMutation,
  useDeleteKidMutation,
} = kidApi;