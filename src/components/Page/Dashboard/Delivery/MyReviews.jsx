import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../Hook/useAxiosPublic';

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const useremail = user.email;
  
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    async function fetchData() {
      try {
        const res = await axiosPublic.get(`/reviews/deliveryMan/${useremail}`);
        setReviews(res.data.reviews);
      } catch (error) {
        console.error("Error fetching deliverymen data:", error);
      }
    }

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {reviews.map((review, index) => (
        <div key={index} className="card w-80 bg-base-100 shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={review.user.image}
                alt={review.user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="font-bold">{review.user.name}</h2>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-xl font-bold">{review.rating}/5</p>
              <span className="ml-2">⭐️</span>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;