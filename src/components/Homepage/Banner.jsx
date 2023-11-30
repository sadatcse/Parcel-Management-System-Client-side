import React from 'react';
import { MdManageSearch } from "react-icons/md";


const Banner = () => {
    return (
        <div className="banner-section relative bg-cover bg-center" style={{ height: '750px', backgroundImage: `url('https://i.ibb.co/6sKW65J/Screenshot-2023-11-29-194352.png')` }}>
            <div className="flex items-center justify-center h-full">
                <div className="banner-content text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Parcel Delivered On Time with no Hassle</h1>
                    <p className="text-lg mb-8">Easily track your courier, Get courier within hours. Efficient & safe delivery.</p>
                    <div className="flex items-center justify-center">
                        <input type="text" placeholder="Search..." className="px-4 py-2 mr-2 rounded-md border border-gray-300" />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                            <MdManageSearch className="mr-2" /> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

