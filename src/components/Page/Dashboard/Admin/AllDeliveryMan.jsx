import React from 'react';
import { FaUser, FaPhone, FaBox, FaStar,FaTruck  } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const AllDeliveryMan = () => {
    const deliveryMen = useLoaderData();
  

    return (
        <div className="container mx-auto px-4">
           <div className="flex items-center">
      <FaTruck className="text-4xl mr-3" />
      <h1 className="text-3xl font-bold mb-6">All Delivery Man List</h1>
    </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"><FaUser className="inline-block mr-2" />Name</th>
                            <th className="px-4 py-2"><FaPhone className="inline-block mr-2" />Phone Number</th>
                            <th className="px-4 py-2"><FaBox className="inline-block mr-2" />Parcels Delivered</th>
                            <th className="px-4 py-2"><FaStar className="inline-block mr-2" />Average Review</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {deliveryMen.map((deliveryMan, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="px-4 py-2">{deliveryMan.name}</td>
                                <td className="px-4 py-2">{deliveryMan.mobile}</td>
                                <td className="px-4 py-2">{deliveryMan.parcelsDelivered}</td>
                                <td className="px-4 py-2">{deliveryMan.averageReview}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMan;