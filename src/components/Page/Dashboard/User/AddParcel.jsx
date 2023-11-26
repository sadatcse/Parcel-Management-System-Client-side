import  { useContext, useState } from 'react';
import { AuthContext } from "../../../../providers/AuthProvider";
import toast from 'react-hot-toast';
import { calculateDeliveryPrice } from '../../../Utilis/price';
import moment from 'moment';
import UseAxioSecure from '../../../Hook/UseAxioSecure';

const AddParcel = () => {
  const { user } = useContext(AuthContext);
  const [parcelprice, setParcelprice] = useState('');
  const axiosSecure = UseAxioSecure();
  const generateSixDigitNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sixDigitNumber = generateSixDigitNumber();

  const Useremail = user?.email;
  const Displayname =user?.displayName;

  const handlePrice = (event) => {
    const value = event.target.value;
    const DeliveryPricea = calculateDeliveryPrice(value);
    setParcelprice(DeliveryPricea); 
  };

  const handleRegister = e => {
    e.preventDefault();
  
    const ParcelId = `${sixDigitNumber}`;
    const SenderName = `${Displayname}`; 
    const SenderEmail = `${Useremail}`;
    const SenderPhone = e.target.senderPhone.value;
  
    const RecipientName = e.target.recipientName.value;
    const RecipientEmail = e.target.recipientEmail.value;
    const RecipientPhone = e.target.recipientPhone.value;
    const DeliveryAddress = e.target.deliveryAddress.value;
    const DeliveryAddressLatitude = e.target.deliveryAddressLatitude.value;
    const DeliveryAddressLongitude = e.target.deliveryAddressLongitude.value;
  
    const ParcelType = e.target.parcelType.value;
    const ParcelWeight = e.target.parcelWeight.value;
  
    const SpecialInstructions = e.target.specialInstructions.value;
    const RequestedDeliveryDate = e.target.requestedDeliveryDate.value;
    const EstimatedDeliveryDate = moment().add(7, 'days').calendar();
    const ParcelCreateTime = moment().format('lll');   
  
    const DeliveryPrice = calculateDeliveryPrice(ParcelWeight);
  
    const ParcelStatus = 'pending';
    const ParcelDeliveryManName = null;
    const DeliveryManEmail = null;
  
    const parcel = {
      ParcelId, SenderName, SenderEmail, SenderPhone, RecipientName, RecipientEmail, RecipientPhone,
      DeliveryAddress, DeliveryAddressLatitude, DeliveryAddressLongitude, ParcelType, ParcelWeight,
      SpecialInstructions, RequestedDeliveryDate, DeliveryPrice, ParcelStatus, ParcelDeliveryManName,
      DeliveryManEmail, EstimatedDeliveryDate, ParcelCreateTime
    };
  
    console.log(parcel);
  
    axiosSecure.post('/parcels', parcel)
      .then(data => {
        toast.success("Parcel Added Sucessful")
        window.location.reload();

      })
      .catch(error => {
        console.error("Error:", error);
  
      });
  };


  return (
    <div className="bg-gray-100  flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-8 text-center">Add New Parcel (Regular Service)</h2>
      <form onSubmit={handleRegister}>
 
        <div className="mb-4">
        <p>Sender Email</p>
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="senderemail" placeholder="Sender Phone" id="senderphone" required defaultValue={Useremail} disabled/>
        <p>Sender Name</p>
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="sendername" placeholder="Sender Phone" id="senderphone" required defaultValue={Displayname} disabled/>
            <p>Sender Phone Number</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="senderPhone" placeholder="Sender Phone" id="senderphone" required />
          <br />
         <p>Recipient Name</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="recipientName" placeholder="Recipient Name" id="RecipientName" required />
          <br />
          <p>Recipient Email</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="recipientEmail" placeholder="Recipient Email" id="8" required />
          <br />
          <p>Recipient Phone</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="recipientPhone" placeholder="Recipient Phone" id="9" required />
          <br />
          <p>Delivery Address</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="deliveryAddress" placeholder="Delivery Address" id="10" required />
          <br />
          <p>Delivery Address Latitude (i.e 21.121365496)</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="deliveryAddressLatitude" placeholder="Delivery Address Latitude" id="11" required />
          <br />
          <p>Delivery Address Longitude(i.e 21.121365496)</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="deliveryAddressLongitude" placeholder="Delivery Address Longitude" id="12" required />
          <br />
          <p>parcel Type</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="parcelType" placeholder="parcel Type" id="13" required />
          <br />
          <p>Parcel Weight</p>
      <input
        onChange={handlePrice}
        className="mb-2 relative border w-full py-2 px-4"
        type="number"
        name="parcelWeight"
        placeholder="Parcel Weight (KG)"
        id="14"
        required
      />
      <br />
          <p>Special Instructions</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="specialInstructions" placeholder="Special Instructions" id="15" required />
          <br />
          <p>Requested Delivery Date</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="date" name="requestedDeliveryDate" placeholder="Requested Delivery Date" id="16" required />
          <br />
          <p>Price</p>
          <input className="mb-2 relative border w-full py-2 px-4" type="text" name="price" placeholder="price" id="price" required value={parcelprice} readOnly/>
        </div>
        <br/>

        <input className="btn btn-secondary mb-4 w-full" type="submit" value="Add Parcel" />
      </form>
    </div>
  </div>




  );
};

export default AddParcel;