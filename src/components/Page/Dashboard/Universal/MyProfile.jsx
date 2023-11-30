
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
function MyProfile() {

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState('');
  const [users, setusers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [imageurl, setimageurl] = useState();

  useEffect(() => {

    if (user && user.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setusers(res.data);
        setimageurl(res.data.Photourl);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [axiosPublic, user]);
  

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0]; 
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setimageurl(res.data.data.url);
      setFormData({ Photourl: res.data.data.url });

      await Swal.fire({
        icon: 'success',
        title: 'Image uploaded successfully!',
        text: `Image URL: ${res.data.data.url}`,
      });
    } catch (error) {

      await Swal.fire({
        icon: 'error',
        title: 'Error uploading image',
        text: error.message, 
      });
    }
    }


  const handleformdataChange = (e) => {
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
      
    }));}

    const handleUpdate = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axiosPublic.patch(`/users/${users._id}`, formData);
        if (response.data && response.data.message === 'User updated successfully') {
          Swal.fire({
            icon: 'success',
            title: 'User Updated Successfully',
            showConfirmButton: false,
            timer: 1500 
          }).then(() => {

            // navigate(`/dashboard/`);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Update User',
            text: 'An error occurred while updating the user',
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Internal server error occurred',
        });
      }
    };
  return (
    <div className="bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold">User Profile Area</h1>
        </div>
        <hr className="my-4 border-2 border-gray-300" />
        <div>
          <form onSubmit={handleUpdate}>

          <div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="row-span-3 ..."><div className="avatar"><div className="w-96 h-96 rounded-xl"><img src={imageurl} />
  </div></div>
    </div>
  <div class="col-span-2 ..."><div><p>User Full Name</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="name" placeholder="Username" id="name" 
required defaultValue={users.name} /></div></div>
  <div class="col-span-2 ..."><div><p>Education</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="education" placeholder="Education" id="education" 
required defaultValue={users.education} /></div></div>
  <div class="col-span-2 ..."><div> <p>Date Of Birth</p>
  <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="date" name="dateOfBirth" placeholder="Date of Birth" id="16" required defaultValue={users.dateOfBirth} /></div>
</div></div>

<div class="grid grid-cols-2 gap-4">
  <div><h1>Upload Profile Image</h1>
  <div className="form-control w-full my-6">
      <input onChange={handleImageUpload} type="file" className="file-input w-full max-w-xs" />
    </div></div>

                    <div><p>Full Image Url</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="Photourl" placeholder="Full Photourl" id="Photourl" 
required defaultValue={imageurl} /></div>
</div>

<div class="grid grid-cols-2 gap-4">
  <div><p>Your Gender</p>
  <div className="mb-4 relative border">
        <label htmlFor="gender">Gender:</label>
        <select onChange={handleformdataChange} type="text" name="gender" id="gender" className="gender-select" defaultValue={users.gender}>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
      </div></div>

      <div><p>User Phone Number</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="mobile" placeholder="User mobile" id="mobile" 
required defaultValue={users.mobile} /></div>
</div>
<hr className="my-4 border-2 border-gray-300" />
<div class="grid grid-cols-2 gap-4">
  <div><input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="streetName" placeholder="Street Name" id="streetnamereg" required defaultValue={users.streetName} /></div>

  <div><input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="streetNumber" placeholder="Street Number" id="streetnumberreg" required defaultValue={users.streetNumber} /></div>
</div>

<div class="grid grid-cols-3 gap-4">
  <div><input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="area" placeholder="Area" id="areareg" required defaultValue={users.area} /></div>
  <div><input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="town" placeholder="Town" id="townreg" required defaultValue={users.town} /></div>
  <div><input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="postCode" placeholder="Post Code" id="postcodereg" required defaultValue={users.postCode} /></div>
</div>




            <hr className="my-4 border-2 border-gray-300" />
            <input className="btn btn-secondary mb-4 w-full" type="submit" value="Update User" />

          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;