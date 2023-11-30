import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaTruck, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';

const Statistics = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/statistics/')
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
