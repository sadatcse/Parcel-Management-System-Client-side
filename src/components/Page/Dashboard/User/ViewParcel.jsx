import React, { useContext } from 'react';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaEdit, FaTimes, FaCheckCircle, FaBan, FaRegEdit, FaRegComment, FaMoneyBill } from 'react-icons/fa';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';



const ViewParcel = () => {
  const { user } = useContext(AuthContext);
  const Useremail = user?.email;
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');

  const axiosPublic = useAxiosPublic();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/parcels/${Useremail}`);
      return res.data.data;
    }
  });

  const filteredParcels = filterStatus === 'All' ? parcels : parcels.filter(parcel => parcel.ParcelStatus === filterStatus);


  const handleFilterChange = (status) => {
    setFilterStatus(status);

  };



  const handleUpdate = (id) => {
    navigate(`/dashboard/updateparcel/${id}`);
  };

  const handleReview = (id) => {

  };

  const handlePay = (id) => {

  };

  const handleCancel = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Cancel Parcel",
        text: "Are you sure you want to cancel this parcel?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!"
      });

      if (result.isConfirmed) {
        const res = await axiosPublic.patch(`/parcels/cancel/${id}`);
        refetch();
        await Swal.fire({
          title: "Cancelled!",
          text: "The parcel has been cancelled.",
          icon: "success"
        });}
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to cancel the parcel. Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">View Parcel</h1>
      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">Filter by Status:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Parcel Type</th>
            <th className="py-2 px-4 border">Requested Delivery Date</th>
            <th className="py-2 px-4 border">Approximate Delivery Date</th>
            <th className="py-2 px-4 border">Booking Date</th>
            <th className="py-2 px-4 border">Delivery Men ID</th>
            <th className="py-2 px-4 border">Booking Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr key={parcel._id}>
              <td className="py-2 px-4 border">{parcel.ParcelType}</td>
              <td className="py-2 px-4 border">{parcel.RequestedDeliveryDate}</td>
              <td className="py-2 px-4 border">{parcel.EstimatedDeliveryDate}</td>
              <td className="py-2 px-4 border">{parcel.ParcelCreateTime}</td>
              <td className="py-2 px-4 border">{parcel.ParcelDeliveryManName || 'Not assigned'}</td>
              <td className="py-2 px-4 border">{parcel.ParcelStatus}</td>
              <td className="py-2 px-4 border">
                {parcel.ParcelStatus === 'pending' && (
                  <>
                    <button onClick={() => handleCancel(parcel._id)} className="flex items-center mr-2 text-red-500">
                      <FaTimes className="mr-1" /> Cancel
                    </button>
                    <button onClick={() => handleUpdate(parcel._id)} className="flex items-center mr-2 text-blue-500">
                      <FaEdit className="mr-1" /> Update
                    </button>
                  </>
                )}
                {parcel.ParcelStatus === 'Delivered' && (
                  <button onClick={() => handleReview(parcel._id)} className="flex items-center mr-2 text-green-500">
                    <FaRegComment className="mr-1" /> Review
                  </button>
                )}
                <button onClick={() => handlePay(parcel._id)} className="flex items-center text-yellow-500">
                  <FaMoneyBill className="mr-1" /> Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewParcel;
