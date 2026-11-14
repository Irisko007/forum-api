import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '../types/post';

export type AuthFormValues = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  name: string | null;
};

type PostResponse = Omit<Post, 'category' | 'author'> & {
  category: { id: number; name: string };
  author: User;
};

export const baseApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      transformResponse: (posts: PostResponse[]) => posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category.name,
        author: post.author.name || post.author.email,
      })),
    }),
    registerUser: builder.mutation<User, AuthFormValues>({
      query: (data) => ({ url: 'auth/register', method: 'POST', body: data }),
    }),
    loginUser: builder.mutation<User, AuthFormValues>({
      query: (data) => ({ url: 'auth/login', method: 'POST', body: data }),
    }),
  }),
});

export const { useGetPostsQuery, useRegisterUserMutation, useLoginUserMutation } = baseApi;

export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
