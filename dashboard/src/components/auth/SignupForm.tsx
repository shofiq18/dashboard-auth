// src/components/auth/SignupForm.tsx
"use client";

import React, { useState } from 'react';
import { useSignupMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import FormInput from '../common/FormInput';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("signup post data ", formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup({ ...formData, role: 'User' }).unwrap();
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      Cookies.set('token', response.data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      toast.success('Signup successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="w-[450px] mx-auto my-10 p-[3px]  animated-gradient-border">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white "
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Create Your Account
        </h2>
        <FormInput
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />
        <FormInput
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />
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
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-3 px-4  hover:from-indigo-700 hover:to-purple-900 disabled:opacity-50 transition-all duration-300 font-semibold"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;