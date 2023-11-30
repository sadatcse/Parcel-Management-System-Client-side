import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { calculateDeliveryPrice } from '../../../Utilis/price';
import UseAxioSecure from '../../../Hook/UseAxioSecure';
import toast from 'react-hot-toast';
import moment from 'moment';
const UpdateParcel = () => {
  const parcel = useLoaderData();
  const [parcelprice, setParcelprice] = useState('');
  const axiosSecure = UseAxioSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState('');

  useEffect(() => {
    if (parcel && parcel.DeliveryPrice) {
      setParcelprice(parcel.DeliveryPrice);
      setFormData(parcel);

    }
  }, [parcel]); 
  

  const handleformdataChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));}

  const handlePrice = (e) => {
    const value = e.target.value;
    console.log(value);
    const DeliveryPricea = calculateDeliveryPrice(value);
  
    setParcelprice(DeliveryPricea);
    setFormData(prevFormData => ({
      ...prevFormData,
      ParcelWeight: value 
    }));
    setFormData(prevFormData => ({
      ...prevFormData,
      DeliveryPrice: DeliveryPricea 
    }));
    console.log(formData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('yes');
  
    try {
      const response = await axiosSecure.patch(`/users/${parcel._id}`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User Updated Successfully',
      }).then(() => {
       
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <AiOutlineEdit className="text-4xl mr-4" />
          <h1 className="text-2xl font-bold">Update Parcel</h1>
        </div>
        <hr className="my-4 border-2 border-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Parcel ID: {parcel.ParcelId}</p>
            <p>Parcel Create Time: {parcel.ParcelCreateTime}</p>
          </div>
          <div>
            <p>Estimated Delivery Date: {parcel.EstimatedDeliveryDate}</p>
            <p>Parcel Status: {parcel.ParcelStatus}</p>
          </div>
        </div>
        <hr className="my-4 border-2 border-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Parcel Sender Name: {parcel.SenderName}</p>
          </div>
          <div>
            <p>Parcel Sender Email: {parcel.SenderEmail}</p>
          </div>
        </div>
        <div>
            
<form onSubmit={handleUpdate}>

<div class="grid grid-cols-2 gap-4">
  <div><p>Sender Phone Number</p>
  <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="SenderPhone" placeholder="Sender Phone" id="senderphone" required defaultValue={parcel.SenderPhone} />
    </div>

  <div> <p>Requested Delivery Date</p>
    <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="date" name="RequestedDeliveryDate" placeholder="Requested Delivery Date" id="16" required defaultValue={parcel.RequestedDeliveryDate} /></div>
</div>
<hr className="my-4 border-2 border-gray-300" />
<div class="grid grid-cols-3 gap-4">
  <div>  <p>Recipient Name</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="RecipientName" placeholder="Recipient Name" id="RecipientName" required defaultValue={parcel.RecipientName} />
    </div>

  <div> <p>Recipient Email</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="RecipientEmail" placeholder="Recipient Email" id="8" required defaultValue={parcel.RecipientEmail} />
          <br /></div>
          <div> <p>Recipient Phone</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="RecipientPhone" placeholder="Recipient Phone" id="9" required defaultValue={parcel.RecipientPhone} /></div>
</div>
<hr className="my-4 border-2 border-gray-300" />

<div class="grid grid-cols-2 gap-4">
  <div> <p>parcel Type</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="ParcelType" placeholder="parcel Type" id="13" required defaultValue={parcel.ParcelType} />
    </div>
  <div> <p>Parcel Weight</p>
         <input  onChange={handlePrice} className="mb-2 relative border w-full py-2 px-4" type="number" name="ParcelWeight" placeholder="Parcel Weight (KG)" id="14" required defaultValue={parcel.ParcelWeight}/>
         </div>

         <div> <p>Special Instructions</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="SpecialInstructions" placeholder="Special Instructions" id="15" required defaultValue={parcel.SpecialInstructions} /> </div>
         <div>  <p>Price</p>
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="price" placeholder="price" id="price" required defaultValue={parcelprice}  disabled/></div>
</div>
<hr className="my-4 border-2 border-gray-300" />

<div class="grid grid-rows-2 grid-flow-col gap-4">
  <div class="row-span-2 col-span-2">          <p>Delivery Address</p>
  <input
  onChange={handleformdataChange}
  className="mb-2 relative border w-full py-2 px-4"
  type="text"
  name="DeliveryAddress"
  placeholder="Delivery Address"
  id="10"
  required
  defaultValue={parcel.DeliveryAddress}
  style={{ height: '100px' }} 
/></div>
  <div class="col-span-2 ..."> <p>Delivery Address Latitude (i.e 21.121365496)</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="DeliveryAddressLatitude" placeholder="Delivery Address Latitude" id="11" required defaultValue={parcel.DeliveryAddressLatitude} /></div>
  <div class="col-span-2 ...">  <p>Delivery Address Longitude(i.e 21.121365496)</p>
          <input onChange={handleformdataChange} className="mb-2 relative border w-full py-2 px-4" type="text" name="DeliveryAddressLongitude" placeholder="Delivery Address Longitude" id="12" required defaultValue={parcel.DeliveryAddressLongitude} /></div>
</div>
<hr className="my-4 border-2 border-gray-300" />
<input  className="btn btn-secondary mb-4 w-full" type="submit" value="Update Parcel" />
 
</form>
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;



