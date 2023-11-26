import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const handleMakeAdmin = (user) => {
        setSelectedUser(user);
    };

    const confirmRoleChange = async (selectedRole) => {
        if (selectedUser) {
            try {
                await axiosSecure.patch(`/users/${selectedRole}/${selectedUser._id}`);
                setSelectedUser(null);
                refetch();
                toast.success("User update Sucessful")
            } catch (error) {
            }
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
    
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${user._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        } catch (error) {
            console.error(error);
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
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-red-500 text-white py-1 px-3 rounded-lg"
                                        >
                                            Admin
                                        </button>
                                    ) : user.role === 'deliveryman' ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-orange-500 text-white py-1 px-3 rounded-lg"
                                        >
                                            Deliveryman
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
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
            {/* Modal for role selection */}
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">Select Role for {selectedUser.name}</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => confirmRoleChange('admin')}
                                className="btn bg-red-500 text-white py-1 px-3 rounded-lg mr-2"
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => confirmRoleChange('deliveryman')}
                                className="btn bg-orange-500 text-white py-1 px-3 rounded-lg mr-2"
                            >
                                Deliveryman
                            </button>
                            <button
                                onClick={() => confirmRoleChange('user')}
                                className="btn bg-blue-500 text-white py-1 px-3 rounded-lg"
                            >
                                Regular User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUser;