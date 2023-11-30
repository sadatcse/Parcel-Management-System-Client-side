
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
function MyProfile() {
  const { user } = useContext(AuthContext);
  const [prouser, setprouser] = useState({});
  const [formData, setFormData] = useState('');
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      setprouser(res.data); 
      setFormData(res.data); 
      return res.data;
    }
  });

  const handleProfilePicUpload = (e) => {

  };

  const handleUpdateProfile = () => {

  };

  const handleformdataChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));}

    const handleUpdate = async (e) => {
      e.preventDefault();
      console.log('yes');
    
      try {
        const response = await axiosPublic.patch(`/users/${users._id}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'User Updated Successfully',
          showConfirmButton: false,
          timer: 1500 
        }).then(() => {
          navigate(`/dashboard`);
        });
      } catch (error) {console.error("Error:", error);}
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
  <div class="row-span-3 ..."><div className="avatar"><div className="w-96 h-96 rounded-xl"><img src={users.Photourl} />
  </div></div>
    </div>
  <div class="col-span-2 ..."><div><p>User Full Name</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="SenderPhone" placeholder="Sender Phone" id="senderphone" 
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
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div></div>

                    <div><p>Full Image Url</p>
<input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="Photourl" placeholder="Full Photourl" id="Photourl" 
required defaultValue={users.Photourl} /></div>
</div>

<div class="grid grid-cols-2 gap-4">
  <div><p>User Gender</p>
  <div className="mb-4 relative border">
       
        <select
          id="gender"
          name="Gender"
          onChange={handleformdataChange}
          className="w-full py-2 px-4"
          value={users.gender}
          required
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
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