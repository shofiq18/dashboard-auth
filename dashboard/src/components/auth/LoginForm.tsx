"use client";

import React, { useState } from 'react';
import { useLoginMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import FormInput from '../common/FormInput';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      Cookies.set('token', response.data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-[400px] h-[350px] mx-auto my-10 p-[3px]  animated-gradient-border">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white  flex flex-col justify-center"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Welcome Back
        </h2>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4  hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 font-semibold"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;