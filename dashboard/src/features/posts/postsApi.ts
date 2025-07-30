
import baseApi from '@/lib/baseApi';
import { Post } from '../../types';

interface PostResponse {
  success: boolean;
  message: string;
  data: Post;
}

interface PostsResponse {
  success: boolean;
  message: string;
  data: Post[];
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getPost: builder.query<PostResponse, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<PostResponse, Partial<Post>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation<PostResponse, { id: string; data: Partial<Post> }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;