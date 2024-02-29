"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * RegisterForm component allows users to register by filling out their name and email.
 * It demonstrates form handling and navigation in Next.js applications.
 */
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Form data would be securly sent to the backend here.
      router.push('/game');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <section className="w-full max-w-full sm:max-w-[50%] flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-4xl">Register</span>
      </h1>
      <p className="desc text-left max-w-md">
        Test your knowledge of the Beatles
      </p>
      {error && <div className="text-red-500">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-2-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name
          </span>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            required 
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required 
            className="form_input"
          />
        </label>
        <div className="flex-center mx-3 mb-5 gap-4">
          <button
            type="submit"
            className="orange_btn"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}