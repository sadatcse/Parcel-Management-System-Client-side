import React from 'react';
import { FaBox, FaEye, FaTruck, FaMoneyBill, FaUser, FaUsers, FaTasks, FaList, FaCreditCard, FaIdBadge, FaClipboardList, FaReceipt, FaUserAlt, FaStar, FaUndo } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    const userName = "John Doe";
    const userImage = "https://file.xunruicms.com/admin_html/assets/pages/media/profile/profile_user.jpg";
    const companyLogo = "https://i.ibb.co/Y8RvjVn/logo.png";

    return (
        <div className='flex flex-col h-screen'>
            {/* Header section */}
            <header className="bg-gray-800 text-white py-4 flex justify-center items-center">
                <img src={companyLogo} alt="Company Logo" className="h-12 mr-4" />
            </header>

            {/* Main content */}
            <div className='flex flex-1'>
                <div className='w-64 min-h-full bg-gradient-to-b from-orange-400 to-orange-600 p-4'>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <img src={userImage} alt="User" className="w-12 h-12 rounded-full mr-3" />
                            <h2 className="text-white text-lg">{userName}</h2>
                        </div>

                    </div>
                    <ul className='menu'>
                    <li><NavLink to="/dashboard/addparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaBox className="mr-2"/> Add Parcel</NavLink></li>
                    <li><NavLink to="/dashboard/viewparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaEye className="mr-2"/> View Parcel</NavLink></li>
                    <li><NavLink to="/dashboard/mydeliveryparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaTruck className="mr-2"/> All Delivery Parcel</NavLink></li>
                    <li><NavLink to="/dashboard/paymentinfo" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaMoneyBill className="mr-2"/> Payment Information</NavLink></li>
                    <li><NavLink to="/dashboard/paymentslip" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaReceipt className="mr-2"/> Payment Slip</NavLink></li>
                    <li><NavLink to="/dashboard/profile" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaUser className="mr-2"/> My Profile</NavLink></li>

                    <li><NavLink to="/dashboard/allparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaClipboardList className="mr-2"/> All Parcel</NavLink></li>
                    <li><NavLink to="/dashboard/undelivery" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaUndo className="mr-2"/> Undelivery Parcel List</NavLink></li>
                    <li><NavLink to="/dashboard/alluser" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaUsers className="mr-2"/> All User</NavLink></li>
                    <li><NavLink to="/dashboard/alldelivery" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaUserAlt className="mr-2"/> All Delivery Man</NavLink></li>
                    <li><NavLink to="/dashboard/deliveryman" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaTasks className="mr-2"/> Delivery Man Assignment</NavLink></li>
                    <li><NavLink to="/dashboard/duepayment" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaCreditCard className="mr-2"/> All Due Payment List</NavLink></li>
                    <li><NavLink to="/dashboard/successfulpayment" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaStar className="mr-2"/> Successful Payment List</NavLink></li>

                    <li><NavLink to="/dashboard/mydelivery" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaTruck className="mr-2"/> My Delivery Parcel List</NavLink></li>
                    <li><NavLink to="/dashboard/sucessparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaBox className="mr-2"/> My Successful Parcel List</NavLink></li>
                    <li><NavLink to="/dashboard/myreviews" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaStar className="mr-2"/> My Reviews</NavLink></li>
                    <li><NavLink to="/dashboard/returnparcel" className="flex items-center py-2 px-4 text-white hover:bg-orange-500"><FaBox className="mr-2"/> Return Parcel List</NavLink></li>
                </ul>
                </div>
                <div className='flex-1 p-4'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
