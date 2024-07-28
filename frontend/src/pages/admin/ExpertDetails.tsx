// src/components/Experts.tsx
import React from 'react';

const Experts: React.FC = () => {
    const experts = [
        { id: 1, profile: 'https://via.placeholder.com/40', expertId: '578278092914', name: 'Amritha s', phone: '9632098524', email: 'amri@gmail.com', status: 'Pending' },
        { id: 2, profile: 'https://via.placeholder.com/40', expertId: '578258092914', name: 'Ameen', phone: '9632098524', email: 'ameen@gmail.com', status: 'Active' },
        { id: 3, profile: 'https://via.placeholder.com/40', expertId: '578278052914', name: 'Aathi', phone: '9632098524', email: 'aathi@gmail.com', status: 'Inactive' },
        { id: 4, profile: 'https://via.placeholder.com/40', expertId: '578278032914', name: 'Amritha s', phone: '9632098524', email: 'amri@gmail.com', status: 'Active' },
    ];

    return (
        <main className="flex-1 p-6 bg-gray-100">
            <div className="bg-white p-4 shadow rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Experts</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Expert</button>
                </div>
                <table className="min-w-full bg-white mt-4">
                    <thead>
                        <tr>
                            <th className="py-2 border-b">No</th>
                            <th className="py-2 border-b">Profile</th>
                            <th className="py-2 border-b">Expert Id</th>
                            <th className="py-2 border-b">Expert Name</th>
                            <th className="py-2 border-b">Phone Number</th>
                            <th className="py-2 border-b">Email Id</th>
                            <th className="py-2 border-b">Status</th>
                            <th className="py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experts.map((expert, index) => (
                            <tr key={expert.id}>
                                <td className="py-2 border-b text-center">{index + 1}</td>
                                <td className="py-2 border-b text-center"><img src={expert.profile} alt="Profile" className="h-10 w-10 rounded-full mx-auto" /></td>
                                <td className="py-2 border-b text-center">{expert.expertId}</td>
                                <td className="py-2 border-b text-center">{expert.name}</td>
                                <td className="py-2 border-b text-center">{expert.phone}</td>
                                <td className="py-2 border-b text-center">{expert.email}</td>
                                <td className="py-2 border-b text-center">
                                    <span className={`px-2 py-1 rounded-full text-white ${expert.status === 'Active' ? 'bg-green-500' : expert.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                        {expert.status}
                                    </span>
                                </td>
                                <td className="py-2 border-b text-center">
                                    <button className="bg-gray-200 px-2 py-1 rounded">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Experts;
