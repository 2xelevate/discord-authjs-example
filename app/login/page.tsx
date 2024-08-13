"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:3001/api/login', { email, password });
      localStorage.setItem('token', data.token); // Consider using cookies for better security
      router.push('/');
    } catch (error: any) {
      setError('Error logging in. Please check your credentials and try again.');
      console.error('Error logging in', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-foreground">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-primary hover:text-primary-foreground">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
