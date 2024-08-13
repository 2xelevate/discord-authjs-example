"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from "../components/dashboard/main-nav";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('https://orbit.tf/api/user', {
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
    <div>
      <MainNav/>
      <main className="p-8">
        <h1>Hello, {username || 'Guest'}!</h1>
      </main>
    </div>
  );
}
