import React, { useEffect } from 'react';

import AOS from 'aos';
import Feature from './Feature';



const Features = () => {
     useEffect(() => {
    AOS.init({ duration: 1000 });

  }, []);
  return (
    <div data-aos="fade-up" className="container mx-auto pt-5 px-3">
      <div className="py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          <Feature
            title="Daily Pick up, No limitations"
            description="Sadatfast Courier gives you the opportunity of unlimited pickup. You can give any amount of parcels regardless of their size and weight. Also, you don’t have to bring your parcels to our office! Our trusted pickup person will visit your location and pick up your parcels on your behalf. You can request pickup for every day of the week."
          />
          <Feature
            title="Faster Payment Service"
            description="At Sadatfast Courier, you can request your payment six days a week. We provide multiple payment methods such as cash, Bkash, or Rocket payment. Also, you can collect the money by transferring your current balance to your preferred bank. Our faster and secure payment service will provide the ultimate solution to your payment problems when using a logistics service."
          />
          <Feature
            title="Real-Time Tracking"
            description="Sadatfast Courier provides a unique tracking code for each of your consignments. Through our website, you can learn the current status of the products and stay up to date."
          />
          <Feature
            title="Cash on Delivery"
            description="At Sadatfast Courier, we will collect the cash on your behalf. Our trusted delivery person will deliver your parcel to your customer and collect the money. Then, with our various payment methods, we will refund your money to you. Additionally, we are giving you the opportunity to send a non-conditioned parcel for delivery."
          />
          <Feature
            title="Online Management"
            description="Sadatfast Courier offers online management for your courier needs. You can manage your parcels conveniently through our platform, streamlining the process and ensuring efficient handling."
          />
          <Feature
            title="Advanced Customer Service"
            description="Our Call Center Executives are always ready 24/7 to help you with your problems. They are fast, well trained, reliable and always ready to solve your problems. Also you can contact us on our Facebook page as well. Our Facebook page admins are always active to give you feedbacks."
          />
        </div>
      </div>
    </div>
  );
};


export default Features;