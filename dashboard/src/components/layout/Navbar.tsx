"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../features/auth/authSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { RootState } from '@/lib/store';


const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("user in navbar", user)

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My App</div>
        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.firstName} ({user.role})</span>
              {user.role === 'Admin' && (
                <a href="/admin" className="text-white hover:text-indigo-200">Admin Dashboard</a>
              )}
              {user.role === 'Editor' && (
                <a href="/editor" className="text-white hover:text-indigo-200">Editor Dashboard</a>
              )}
              <a href="/dashboard" className="text-white hover:text-indigo-200">Dashboard</a>
              <button
                onClick={handleLogout}
                className="text-white hover:text-indigo-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-white hover:text-indigo-200">Login</a>
              <a href="/signup" className="text-white hover:text-indigo-200">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;