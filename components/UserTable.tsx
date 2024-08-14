import React from 'react';

interface UserTableProps {
    users: any[];
    onResetPassword: (userId: number) => void;
    onChangeUsername: (userId: number) => void;
    onAssignRole: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onResetPassword, onChangeUsername, onAssignRole }) => {
    return (
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
                                onClick={() => onResetPassword(user.id)} 
                                className="text-blue-500 hover:text-blue-700">
                                Reset Password
                            </button>
                            <button 
                                onClick={() => onChangeUsername(user.id)} 
                                className="text-green-500 hover:text-green-700 ml-4">
                                Change Username
                            </button>
                            <button 
                                onClick={() => onAssignRole(user.id)} 
                                className="text-purple-500 hover:text-purple-700 ml-4">
                                Assign Role
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
