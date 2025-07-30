

import baseApi from '@/lib/baseApi';
import { User } from '../../types';

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'Admin' | 'User' | 'Editor';
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

interface UpdateRoleRequest {
  role: 'Admin' | 'User' | 'Editor';
}

interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    getMe: builder.query<MeResponse, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
    getUsers: builder.query<UsersResponse, void>({
      query: () => '/auth/users',
      providesTags: ['Auth'],
    }),
    updateUserRole: builder.mutation<AuthResponse, { id: string; data: UpdateRoleRequest }>({
      query: ({ id, data }) => ({
        url: `/auth/update-role/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
//fdsafdsafsafffffffffff
export const {
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} = authApi;
