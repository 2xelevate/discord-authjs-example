import React from 'react';

const Topbar: React.FC = () => {
    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-700">
            <div className="text-xl font-bold">Admin Dashboard</div>
            <div>
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Logout</button>
            </div>
        </header>
    );
};

export default Topbar;