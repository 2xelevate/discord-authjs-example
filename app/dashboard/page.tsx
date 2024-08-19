"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from "../../components/dashboard/main-nav";

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('https://api.orbit.tf/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />
      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Hello, {username || 'Guest'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to your dashboard. Here's where you can manage your settings and view your information.
          </p>
        </div>
      </main>
    </div>
  );
}
