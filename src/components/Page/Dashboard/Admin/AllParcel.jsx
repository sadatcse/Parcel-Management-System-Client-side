import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import useAxiosPublic from './../../../Hook/useAxiosPublic';


const AllParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);

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
      setCount(res.data.length); 
      
      return res.data;
    },
  });

 
  async function fetchData() {
    try {
      const res = await axiosPublic.get(`/alldeliveryman`);
      setDeliveryMen(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching deliverymen data:", error);
    }
  }

 


  const handleAssign = async () => {
    console.log(deliveryDate);
    const filteredDeliveryMan = deliveryMen.filter(man => man._id === selectedDeliveryMan);
    console.log(filteredDeliveryMan[0]);
    const deliverymanEmail = filteredDeliveryMan[0].email;
    const deliverymanname = filteredDeliveryMan[0].name;
  
    try {
      await axiosPublic.patch(`/patchparcels/${selectedParcel._id}`, {
        ParcelStatus: 'On The Way',
        DeliveryManEmail: deliverymanEmail,
        ParcelDeliveryManName: deliverymanname,
        EstimatedDeliveryDate: deliveryDate,
      });
      refetch();
  
      setselectedParcel(null);

      Swal.fire({
        icon: 'success',
        title: 'Delivery Man Assigned!',
        text: 'The delivery man has been successfully assigned.',
      });
    } catch (error) {
      console.error('Error assigning delivery man:', error);
      Swal.fire({
        icon: 'error',
        title: 'Assignment Failed',
        text: 'There was an error assigning the delivery man. Please try again.',
      });
    }
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
    setCount(filteredData.length); 
  };


  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleManageParcel = (parcel) => {
    fetchData();
    setselectedParcel(parcel);
    console.log(parcel);
 
  };

  const handleSearch = () => {
    let searchResults = parcels;

    if (fromDate && toDate) {
      searchResults = parcels.filter((parcel) => {
        const parcelDate = new Date(parcel.ParcelCreateTime).getTime();
        const startDate = new Date(fromDate).getTime();
        const endDate = new Date(toDate).getTime();

        return parcelDate >= startDate && parcelDate <= endDate;
      });
    }

    setFilteredParcels(searchResults);
    setCount(searchResults.length); 
   
  };
  
  const updateParcelData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedMenus = filteredParcels.slice(startIndex, endIndex);
    return pagedMenus;
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
        
          {updateParcelData().map((parcel) => (
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
              {deliveryMen.length > 0 ? (
  deliveryMen.map((deliveryMan) => (
    <option key={deliveryMan._id} value={deliveryMan._id}>
      {deliveryMan.name} - {deliveryMan._id}
    </option>
  ))
) : (
  <option value="">Loading...</option>
)}
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

export default AllParcel;