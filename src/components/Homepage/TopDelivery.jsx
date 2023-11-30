import React, { useState, useEffect } from 'react';
import { MdStarBorder } from "react-icons/md";
import useAxiosPublic from '../Hook/useAxiosPublic';
const TopDelivery = () => {
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const Deliveryman = async () => {
      try {
        const response = await axiosPublic.get('/deliveryman/');
        const userDataList = response.data.userDataList;
        const sortedDeliveryMen = userDataList.sort((a, b) => b.ParcelDelivery - a.ParcelDelivery || b.averageRating - a.averageRating);
        const topFiveDeliveryMen = sortedDeliveryMen.slice(0, 5);
        setTopDeliveryMen(topFiveDeliveryMen);
            } 
      catch (error) {console.error('Error fetching data:', error);}};

      Deliveryman();
  }, []);

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Delivery Men</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {topDeliveryMen.map((deliveryMan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl p-2">
            <div className="avatar">
  <div className="w-full h-72 rounded-md"><img src={deliveryMan.userData.Photourl} /></div></div>
            <div className="mt-4 p-2">
              <h2 className="text-xl font-semibold mb-2">{deliveryMan.userData.name}</h2>
              <p className="text-gray-600 mb-2">Number of Parcels Delivered: {deliveryMan.ParcelDelivery}</p>
              <div className="flex items-center text-yellow-500"><MdStarBorder className="mr-1" />{deliveryMan.averageRating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDelivery;