"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/signup', { email, password, username });
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}
