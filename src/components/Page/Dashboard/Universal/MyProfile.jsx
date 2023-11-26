


import { useState } from 'react';
import { FaUser, FaEnvelope, FaBirthdayCake, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa'; 

function MyProfile() {
  const [user, setUser] = useState({
    displayName: 'Emma Smith',
    email: 'emma.smith@example.com',
    dateOfBirth: '1990-05-20',
    education: "Bachelor's Degree",
    photoURL: 'https://www.example.com/photo',
    address: {
      streetName: 'Oak Avenue',
      streetNumber: '123',
      town: 'Cityville',
      postCode: '54321',
    },
  });

  const [profilePic, setProfilePic] = useState(user.photoURL);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicUpload = (e) => {


  };

  const handleUpdateProfile = () => {

  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{user.displayName}'s Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative rounded-full overflow-hidden w-32 h-32">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <label htmlFor="profilePicInput" className="absolute bottom-0 right-0 z-10">
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                className="sr-only"
              />
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
                Change
              </button>
            </label>
          )}
        </div>


        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>{user.displayName}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <FaBirthdayCake className="mr-2" />
            <span>{user.dateOfBirth}</span>
          </div>
          <div className="flex items-center">
            <FaGraduationCap className="mr-2" />
            <span>{user.education}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>{`${user.address.streetNumber} ${user.address.streetName}, ${user.address.town}, ${user.address.postCode}`}</span>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
