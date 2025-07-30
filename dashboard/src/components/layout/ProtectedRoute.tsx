"use client";

import React from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';


interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!user || !allowedRoles.includes(user.role)) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;