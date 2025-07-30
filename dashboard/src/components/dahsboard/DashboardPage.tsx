
"use client";
import React from 'react';
import ProtectedRoute from '../../components/layout/ProtectedRoute';
import { useGetPostsQuery } from '../../features/posts/postsApi';

export default function DashboardPage() {
  const { data, isLoading } = useGetPostsQuery();

  return (
    <ProtectedRoute allowedRoles={['Admin', 'User', 'Editor']}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          <ul>
            {data?.data.map((post) => (
              <li key={post._id} className="mb-2">
                {post.title} - {post.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}