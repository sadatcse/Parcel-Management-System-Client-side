import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaMapMarker, FaTimes, FaTruck } from 'react-icons/fa';
import Swal from "sweetalert2";
import Map from 'react-map-gl';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';




const MyDeliveryParcelList = () => {

    const { user } = useContext(AuthContext);

    const [parcelData, setParcelData] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [deliveryLatitude, setdeliveryLatitude] = useState('');
    const [deliveryLongitude, setdeliveryLongitude] = useState('');
    console.log(deliveryLatitude);

    const [viewport, setViewport] = useState({
        width: '300px',
        height: '600px',
        latitude: deliveryLatitude,
        longitude: deliveryLongitude,
        zoom: 3,
    });


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/dparcels/${user.email}`);
            setParcelData(res.data);
            return res.data;
        },
    });

    const viewLocation = (latitude, longitude) => {
        setdeliveryLatitude(latitude);
        setdeliveryLongitude(longitude);
        setShowPopup(true);
    };

    const closeviewLocation = () => {
  
        setShowPopup(false);
    };




    const handleCancel = async (id) => {
        console.log(id);
        const confirmation = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This action will cancel the booking. Do you want to proceed?',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        });

        if (confirmation.isConfirmed) {

            try {
                const response = await axiosPublic.patch(`/parcels/cancel/${id}`);
                setResponse(response.data);
            } catch (error) {
                setResponse(error.message);
            }
            refetch();

            Swal.fire({
                icon: 'success',
                title: 'Booking Cancelled!',
                text: 'The booking has been cancelled successfully.',
            });
        }
    };




    const handleDeliver = async (id) => {
        console.log(id);
        const confirmation = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This action will mark the booking as delivered. Do you want to proceed?',
            showCancelButton: true,
            confirmButtonText: 'Yes, mark as delivered!',
            cancelButtonText: 'No, keep it'
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await axiosPublic.patch(`/parcels/Delivery/${id}`);
                setResponse(response.data);
            } catch (error) {
                setResponse(error.message);
            }
            refetch();

            Swal.fire({
                icon: 'success',
                title: 'Booking Delivered!',
                text: 'The booking has been marked as delivered successfully.',
            });
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center mb-4">
                <FaBox className="text-3xl mr-2" />
                <h1 className="text-2xl font-bold">My Delivery Parcel List</h1>
        
            </div>



            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4">Booked User's Name</th>
                        <th className="py-2 px-4">Receiver's Name</th>
                        <th className="py-2 px-4">Booked User's Phone</th>
                        <th className="py-2 px-4">Requested Delivery Date</th>
                        <th className="py-2 px-4">Approximate Delivery Date</th>
                        <th className="py-2 px-4">Receiver's Phone Number</th>
                        <th className="py-2 px-4">Receiver's Address</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcelData.map((parcel) => (
                        <tr key={parcel._id} className="border-b border-gray-300">
                            <td className="py-3 px-4">{parcel.SenderName}</td>
                            <td className="py-3 px-4">{parcel.RecipientName}</td>
                            <td className="py-3 px-4">{parcel.SenderPhone}</td>
                            <td className="py-3 px-4">{parcel.RequestedDeliveryDate}</td>
                            <td className="py-3 px-4">{parcel.EstimatedDeliveryDate}</td>
                            <td className="py-3 px-4">{parcel.RecipientPhone}</td>
                            <td className="py-3 px-4">{parcel.DeliveryAddress}</td>
                            <td className="flex gap-2 py-3 px-4">
                                {parcel.ParcelStatus === 'cancel' && (
                                    <>
                                        <p>Parcel Cancel</p>
                                    </>
                                )}
                                {parcel.ParcelStatus === 'Delivery' && (
                                    <>
                                        <p>Parcel Delivered Sucessful</p>
                                    </>
                                )}
                                {parcel.ParcelStatus !== 'cancel' && parcel.ParcelStatus !== 'Delivery' && (
                                    <>
                                        <button
                                            onClick={() => viewLocation(parcel.DeliveryAddressLatitude, parcel.DeliveryAddressLongitude)}
                                            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            <FaMapMarker className="mr-1" /> View Location
                                        </button>
                                        <button
                                            onClick={() => handleCancel(parcel._id)}
                                            className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            <FaTimes className="mr-1" /> Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDeliver(parcel._id)}
                                            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md focus:outline-none"
                                        >
                                            <FaTruck className="mr-1" /> Deliver
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md">
              <div
                className="map-modal"
                style={{
                  width: "50vw",
                  height: "50vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={closeviewLocation}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ marginBottom: "20px" }}
                >
                  Close Map
                </button>
                <ReactMapGL
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken='pk.eyJ1Ijoic2FkYXRjc2UiLCJhIjoiY2xwZ3g4MmtiMDF2YjJxdDNvdmNuNmtqMCJ9.ZRooItpBjuEh9Z4khqiwBg'
                  onViewportChange={(newViewport) => setViewport(newViewport)}
                >
                </ReactMapGL>
              </div>
            </div>
          </div>
            )}
        </div>
    );
};

export default MyDeliveryParcelList;