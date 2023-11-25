import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaTrashAlt, FaUsers } from 'react-icons/fa';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const person ='user';
    const admin ='admin';
    const man ='deliveryman'
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = async (user, role) => {
        try {
            const res = await axiosSecure.patch(`/users/${role}/${user._id}`);

            queryClient.invalidateQueries('users');
            refetch();
        } catch (error) {

        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const res = await axiosSecure.delete(`/users/${user._id}`);
            queryClient.invalidateQueries('users');
            refetch();
        } catch (error) {

        }
    };
    return (
<div className="p-4">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
    </div>
    <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
   
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">
                            {user.role === 'admin' ? (
                                <button
                                    onClick={() => handleMakeAdmin(user, 'man')}
                                    className="btn bg-red-500 text-white py-1 px-3 rounded-lg"
                                >
                                    Admin
                                </button>
                            ) : user.role === 'man' ? (
                                <button
                                    onClick={() => handleMakeAdmin(user, 'admin')}
                                    className="btn bg-orange-500 text-white py-1 px-3 rounded-lg"
                                >
                                    Deliveryman
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleMakeAdmin(user, 'man')}
                                    className="btn bg-blue-500 text-white py-1 px-3 rounded-lg"
                                >
                                    Regular User
                                </button>
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDeleteUser(user)}
                                className="btn bg-white hover:bg-red-100 py-1 px-3 rounded-lg"
                            >
                                <FaTrashAlt className="text-red-600" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default AllUser;