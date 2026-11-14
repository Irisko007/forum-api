import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type AuthFormValues = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  name: string | null;
};

export const baseApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, AuthFormValues>({
      query: (data) => ({ url: 'auth/register', method: 'POST', body: data }),
    }),
    loginUser: builder.mutation<User, AuthFormValues>({
      query: (data) => ({ url: 'auth/login', method: 'POST', body: data }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = baseApi;

export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
