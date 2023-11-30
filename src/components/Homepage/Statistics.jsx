import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';
import useAxiosPublic from '../Hook/useAxiosPublic';
const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/statistics/')
            .then(response => {
                setStatistics(response.data);
            })
            .catch(error => {
                console.error('Error fetching statistics:', error);
            });
    }, []);

    return (
        <div className="stats shadow flex justify-between m-5">
            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaBox size={32} />
                </div>
                <div className="stat-title text-center">Parcel Booked</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={statistics.numberOfParcelBook} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>

            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaTruck size={32} />
                </div>
                <div className="stat-title text-center ">Parcel Delivered</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={statistics.numberOfParcelDeliveries} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>

            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaUsers size={32} />
                </div>
                <div className="stat-title text-center">New User</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={statistics.numberOfUsers} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
