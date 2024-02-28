// pages/auth/signin.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      // Redirect to the desired page after successful sign-in
      window.location.href = '/';
    }
    // Handle sign-in failure (e.g., display an error message)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Sign In</button>
    </form>
  );
}
