import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [count, setCount] = useState(0);


      const { data: usersData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          try {
            const res = await axiosSecure.get('/users');
            setCount(res.data.length); 
            return res.data;
            
          } catch (error) {
            throw new Error(error)
          }
        },
      });
    
      const users = Array.isArray(usersData) ? usersData : [];


    const [selectedUser, setSelectedUser] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    
    const numberOfPages = Math.ceil(count / itemsPerPage);

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
    const updateuserData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pagedMenus = users.slice(startIndex, endIndex);
        return pagedMenus;
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
                            <th className="px-4 py-2">Parcel Booking</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updateuserData().map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.ParcelBook !== undefined && user.ParcelBook !== null ? user.ParcelBook : 'Not User or Not Send any Parcel'}</td>

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
             <div className='pagination flex items-center justify-center mt-4 space-x-4'>
        <p className='text-gray-600'>Current Page: {currentPage + 1}</p>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-2 py-1 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {[...Array(numberOfPages)].map((_, index) => (
          <button
            onClick={() => setCurrentPage(index)}
            key={index}
            className={`px-2 py-1 rounded ${currentPage === index ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-2 py-1 rounded ${currentPage === numberOfPages - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={currentPage === numberOfPages - 1}
        >
          Next
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(0);
          }}
          className='px-2 py-1 border border-gray-300 rounded'
        >
          <option value='9'>9</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
        </select>
      </div>
        </div>
    );
};

export default AllUser;