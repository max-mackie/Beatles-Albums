"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import axios from 'axios';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const response = await axios.post('/api/auth/register', formData);
    //   console.log('User registered:', response.data);
      router.push('/game');
    } catch (error) {
      console.error('Registration error:', error.response.data.error);
    }
  };
  return (
    <section className="w-full max-w-full sm:max-w-[50%] flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-4xl">Register</span>
      </h1>
      <p className="desc text-left max-w-md">
        Test your knowledge of the beatles
      </p>
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
