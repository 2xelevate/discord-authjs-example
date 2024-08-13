"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('https://api.orbit.tf/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(data);
      } catch (error: any) {
        setError('Error fetching users');
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-center text-3xl font-bold">Admin Dashboard</h1>
      <div className="w-full max-w-md p-8 space-y-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.admin ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleResetPassword(user.id)} 
                    className="text-blue-500 hover:text-blue-700">
                    Reset Password
                  </button>
                  <button 
                    onClick={() => handleChangeUsername(user.id)} 
                    className="text-green-500 hover:text-green-700 ml-4">
                    Change Username
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function handleResetPassword(userId: number) {
    try {
      const newPassword = prompt('Enter new password:');
      if (newPassword) {
        await axios.post(`https://api.orbit.tf/api/admin/users/${userId}/reset-password`, { newPassword }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Password reset successfully');
      }
    } catch (error: any) {
      console.error('Error resetting password', error);
      alert('Error resetting password');
    }
  }

  async function handleChangeUsername(userId: number) {
    try {
      const newUsername = prompt('Enter new username:');
      if (newUsername) {
        await axios.put(`https://api.orbit.tf/api/admin/users/${userId}/username`, { newUsername }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Username updated successfully');
      }
    } catch (error: any) {
      console.error('Error updating username', error);
      alert('Error updating username');
    }
  }
}
