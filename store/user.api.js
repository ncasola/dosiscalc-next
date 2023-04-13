import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    tagTypes: ["User"],
    refetchOnMountOrArgChange: 30,
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/user",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
        }),
    }),
});

export const {
    useCreateUserMutation,
} = userApi;