import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kidApi = createApi({
  reducerPath: "kidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getKids: builder.query({
      query: () => "/kids",
    }),
    getKid: builder.query({
      query: (id) => `/kids/${id}`,
    }),
    createKid: builder.mutation({
      query: (newKid) => ({
        url: "/kids",
        method: "POST",
        body: newKid,
      }),
    }),
    updateKid: builder.mutation({
      query: ({ id, update }) => ({
        url: `/kids/${id}`,
        method: "PATCH",
        body: update,
      }),
    }),
    deleteKid: builder.mutation({
      query: (id) => ({
        url: `/kids/${id}`,
        method: "DELETE",
      }),
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