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
import moment from 'moment';


const ViewParcel = () => {
  const { user } = useContext(AuthContext);
  const Useremail = user?.email;
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });


  

  const axiosPublic = useAxiosPublic();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/parcels/${Useremail}`);
      setCount(res.data.data.length); 
      return res.data.data;
    }
  });

  const filteredParcels = filterStatus === 'All' ? parcels : parcels.filter(parcel => parcel.ParcelStatus === filterStatus);
  


  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCount(filteredParcels.length); 

  };

  const updateParcelData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedMenus = filteredParcels.slice(startIndex, endIndex);
    return pagedMenus;
  };


  const handleUpdate = (id) => {
    navigate(`/dashboard/updateparcel/${id}`);
  };

  const handleReview = (id) => { 
    const filterParcel = filteredParcels.find(parcel => parcel._id === id);
    if (filterParcel) {
      const { ParcelDeliveryManName, DeliveryManEmail } = filterParcel;
      
      setReviewData({
        user: {
          name: user.displayName,
          image: user.photoURL,
          email: user.email,
        },
        deliveryMan: {
          name: ParcelDeliveryManName,
          email: DeliveryManEmail,
        },
        rating: '',
        comment: "",
        date: moment().format('lll')
      });
      console.log(reviewData);
      setShowModal(true);
    } else {
      console.error('Parcel not found');
    }
  };

  const handlePay = (id) => {

  };

  const handleRatingChange = (e) => {
    setReviewData({ ...reviewData, rating: parseInt(e.target.value, 10) });
  };

  const handleCommentChange = (e) => {
    setReviewData({ ...reviewData, comment: e.target.value });
  };

  const handleReviewSubmit = () => {

    axiosPublic.post(`/reviews`, reviewData);
    refetch();
    setShowModal(false);
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
          {updateParcelData().map((parcel) => (
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
                {parcel.ParcelStatus === 'Delivery' && (
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
      {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md">
    <form onSubmit={handleReviewSubmit} className="p-4">
      {/* User's Name and Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">User Name:</label>
        <p>{reviewData.user.name}</p>
        <label className="block text-sm font-semibold mb-1">User Email:</label>
        <p>{reviewData.user.email}</p>
      </div>

      {/* Delivery Man's Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Delivery Man Name:</label>
        <p>{reviewData.deliveryMan.name}</p>
      </div>

      {/* Rating Input */}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-semibold mb-1">Rating (out of 5):</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          onChange={handleRatingChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Comment Input */}
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-semibold mb-1">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          onChange={handleCommentChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit Review
      </button>
    </form>
                       
                    </div>
                </div>
            )}
  
    </div>
  );
};

export default ViewParcel;
