"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MainNav } from "../../../components/dashboard/main-nav";
import { message } from 'antd'; // Import Ant Design message component
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset

export default function Settings() {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = message.useMessage(); // Initialize Ant Design message API

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.orbit.tf/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
          },
        });
        setUserData({ username: response.data.username, email: response.data.email });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('https://api.orbit.tf/api/user', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
        },
      });
      api.success({ content: response.data.message }); // Display success message
    } catch (error) {
      console.error('Error updating user data:', error);
      api.error({ content: 'Error updating information' }); // Display error message
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {contextHolder} {/* Render Ant Design message container */}
      <MainNav />
      <main className="p-8 md:p-16 lg:p-24">
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6">Settings</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-md p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
