import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const AdminHome = () => {
    const [parcelData, setParcelData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sadatfast-server.vercel.app/parceldata/');
                setParcelData(response.data);
            } catch (error) {
                console.error('Error fetching parcel data:', error);
            }
        };

        fetchData();
    }, []);

    const prepareChartData = () => {
        const categories = [];
        const data = [];

        // Assuming the received data structure is an array of objects with _id and count properties
        parcelData.forEach(item => {
            const { year, month } = item._id;
            categories.push(`${year}-${month}`);
            data.push(item.count);
        });

        return {
            options: {
                xaxis: {
                    categories: categories,
                },
            },
            series: [
                {
                    name: 'Bookings',
                    data: data,
                },
            ],
        };
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h1 className="text-3xl font-bold mb-6">Statistics Page</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Bookings by Date</h2>
                    <Chart
                        options={prepareChartData().options}
                        series={prepareChartData().series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;