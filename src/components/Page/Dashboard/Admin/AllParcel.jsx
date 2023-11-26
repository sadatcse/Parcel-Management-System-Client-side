import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const AllParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [filteredParcels, setFilteredParcels] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedParcel, setselectedParcel] = useState(null);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get('/parcels/');
      setFilteredParcels(res.data);
      return res.data;
    },
  });

  axiosPublic.get('/deliveryman')
  .then(response => {
    setDeliveryMen(response.data);
  });


  const handleAssign = async () => {
    setselectedParcel(null);
    console.log(selectedDeliveryMan);
    console.log(deliveryDate);
    // try {
    //   // Make a request to update the database
    //   await axiosPublic.put(`/patchparcels/${selectedParcel._id}`, {
    //     ParcelStatus: 'On The Way',
    //     deliveryMenID: selectedDeliveryMan,
    //     DeliveryManEmail:'',
    //     ParcelDeliveryManName:'',
    //     EstimatedDeliveryDate: deliveryDate,
    //   });

    //   setselectedParcel(null);
    // } catch (error) {
    //   console.error('Error assigning delivery man:', error);
    // }
  };





  

  
  const handleFilter = (filterType) => {
    let filteredData = [];
  
    switch (filterType) {
      case 'all':
        filteredData = parcels;
        break;
      case 'delivered':
        filteredData = parcels.filter(parcel => parcel.ParcelStatus === 'Delivery');
        break;
        case 'pending':
        filteredData = parcels.filter(parcel => parcel.ParcelStatus === 'pending');
        break;
        case 'cancelled':
        filteredData = parcels.filter(parcel => parcel.ParcelStatus === 'cancel');
        break;
        case 'onTheWay':
        filteredData = parcels.filter(parcel => parcel.ParcelStatus === 'On The Way');
        break;
        case 'pending':
        filteredData = parcels.filter(parcel => parcel.ParcelStatus === 'pending');
        break;
        case 'latest':
            filteredData = parcels.slice(); 
            filteredData.sort((a, b) => {
              const dateA = new Date(a.RequestedDeliveryDate);
              const dateB = new Date(b.RequestedDeliveryDate);
              return dateB - dateA;
            });
            break;
      default:
        filteredData = parcels;
        break;
    }
  
  
    setFilteredParcels(filteredData);
  };



  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleManageParcel = (parcel) => {
    setselectedParcel(parcel);
    console.log(parcel);
 
  };

  const handleSearch = () => {
    let searchResults = parcels;

    if (fromDate && toDate) {
      searchResults = parcels.filter((parcel) => {
        // Assuming ParcelCreateTime is a date string in the format 'YYYY-MM-DD'
        const parcelDate = new Date(parcel.ParcelCreateTime).getTime();
        const startDate = new Date(fromDate).getTime();
        const endDate = new Date(toDate).getTime();

        return parcelDate >= startDate && parcelDate <= endDate;
      });
    }

    setFilteredParcels(searchResults);
  };



  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">View all Parcels</h1>

      <div className="flex mb-4 space-x-4">
      {/* Filter Buttons */}
      <button className="btn" onClick={() => handleFilter('all')}>
        All
      </button>
      <button className="btn" onClick={() => handleFilter('pending')}>
        Pending
      </button>
      <button className="btn" onClick={() => handleFilter('onTheWay')}>
        On the way
      </button>
      <button className="btn" onClick={() => handleFilter('delivered')}>
        Delivered
      </button>
      <button className="btn" onClick={() => handleFilter('cancelled')}>
        Cancelled
      </button>
      <button className="btn" onClick={() => handleFilter('latest')}>
        Latest Entries
      </button>
      <input
        type="date"
        placeholder="From Date"
        onChange={(e) => handleFromDateChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <input
        type="date"
        placeholder="To Date"
        onChange={(e) => handleToDateChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button className="btn" onClick={() => handleSearch()}>
        Search
      </button>
    </div>


      <table className="min-w-full border border-gray-200">
      <thead>
  <tr className="bg-gray-100">
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Booking By <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Booking User Email <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Requested Delivery Date <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Booking Date <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Cost <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Booking Status <IoIosArrowDown className="ml-1" />
      </span>
    </th>
    <th className="py-2 px-4 border">
      <span className="flex items-center">
        Actions <IoIosArrowDown className="ml-1" />
      </span>
    </th>
  </tr>
</thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr key={parcel._id}>
              <td className="py-2 px-4 border">{parcel.SenderName}</td>
              <td className="py-2 px-4 border">{parcel.SenderEmail}</td>
              <td className="py-2 px-4 border">{parcel.RequestedDeliveryDate}</td>
              <td className="py-2 px-4 border">{parcel.ParcelCreateTime}</td>
              <td className="py-2 px-4 border">{parcel.DeliveryPrice}</td>
              <td className="py-2 px-4 border">{parcel.ParcelStatus}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleManageParcel(parcel)}
                  className="flex items-center text-yellow-500 focus:outline-none"
                >
                  <FaEdit className="mr-1" /> Manage Parcel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedParcel && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Select Role for {selectedParcel.SenderName}</h2>
          <div className="flex justify-between">
            <select
              value={selectedDeliveryMan}
              onChange={(e) => setSelectedDeliveryMan(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mb-4"
            >
              <option value="">Select Delivery Man</option>
              {deliveryMen.map((deliveryMan) => (
                <option key={deliveryMan.name} value={deliveryMan._id}>
                  {deliveryMan.name} - {deliveryMan._id}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mb-4"
            />
            <button onClick={handleAssign} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Assign
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default AllParcel;