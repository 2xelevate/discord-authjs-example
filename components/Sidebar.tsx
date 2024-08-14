import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="flex-1 mt-6">
                <ul>
                    <li>
                        <Link href="/admin" className="block p-4 hover:bg-gray-700">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/users" className="block p-4 hover:bg-gray-700">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/settings" className="block p-4 hover:bg-gray-700">
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
