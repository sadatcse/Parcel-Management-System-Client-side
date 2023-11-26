import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {HelmetProvider } from 'react-helmet-async';
// Import React Router dom 

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

// Import Browser Root

import Root from './components/Root';
import AuthProvider from './providers/AuthProvider';
import PrivateRoot from './components/Root/PrivateRoot';


// Registration and Login 

import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';

//Page 

import Home from './components/Page/Home';
import Error404 from './components/Page/Error404';
import Dashboard from './components/Layout/Dashboard';
import AllUser from './components/Page/Dashboard/Admin/AllUser';
import AllDeliveryMan from './components/Page/Dashboard/Admin/AllDeliveryMan';
import AllDuePaymentList from './components/Page/Dashboard/Admin/AllDuePaymentList';
import AllParcel from './components/Page/Dashboard/Admin/AllParcel';
import DeliveryManAssignment from './components/Page/Dashboard/Admin/DeliveryManAssignment';
import SuccessfulPaymentList from './components/Page/Dashboard/Admin/SuccessfulPaymentList';
import UndeliveryParcelList from './components/Page/Dashboard/Admin/UndeliveryParcelList';
import MyDeliveryParcelList from './components/Page/Dashboard/Delivery/MyDeliveryParcelList';
import MyReviews from './components/Page/Dashboard/Delivery/MyReviews';
import MySuccessfulParcelList from './components/Page/Dashboard/Delivery/MySuccessfulParcelList';
import ReturnParcelList from './components/Page/Dashboard/Delivery/ReturnParcelList';

import AddParcel from './components/Page/Dashboard/User/AddParcel';
import AllDeliveryParcel from './components/Page/Dashboard/User/AllDeliveryParcel';
import PaymentInformation from './components/Page/Dashboard/User/PaymentInformation';
import PaymentSlip from './components/Page/Dashboard/User/PaymentSlip';
import ViewParcel from './components/Page/Dashboard/User/ViewParcel';
import MyProfile from './components/Page/Dashboard/Universal/MyProfile';
import UserHome from './components/Page/Dashboard/Home/UserHome';
import DeliveryHome from './components/Page/Dashboard/Home/DeliveryHome';
import AdminHome from './components/Page/Dashboard/Home/AdminHome';
import Updateparcel from './components/Page/Dashboard/Universal/updateparcel';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path:'/',
        element:<Home></Home>
        
      },
      {
        path:'/login',
        element:<Login></Login>
      },

      {
        path: '/register',
        element: <Register></Register>
      },
       
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error404></Error404>,
    children: [
      //admin area
      {
        path:'alluser',
        element:<AllUser></AllUser>
        
      },
      {
        path:'adminhome',
        element:<AdminHome></AdminHome>
        
      },
      {
        path:'alldelivery',
        element:<AllDeliveryMan></AllDeliveryMan>
        
      },
      {
        path:'duepayment',
        element:<AllDuePaymentList></AllDuePaymentList>
        
      },
      {
        path:'allparcel',
        element:<AllParcel></AllParcel>
        
      },
      {
        path:'deliveryman',
        element:<DeliveryManAssignment></DeliveryManAssignment>
        
      },
      {
        path:'successfulpayment',
        element:<SuccessfulPaymentList></SuccessfulPaymentList>
        
      },
      {
        path:'undelivery',
        element:<UndeliveryParcelList></UndeliveryParcelList>
        
      },
       //Delivery man area
       {
        path:'deliveryhome',
        element:<DeliveryHome></DeliveryHome>
        
      },

       {
        path:'mydelivery',
        element:<MyDeliveryParcelList></MyDeliveryParcelList>
        
      },
      {
        path:'myreviews',
        element:<MyReviews></MyReviews>
        
      },
      {
        path:'sucessparcel',
        element:<MySuccessfulParcelList></MySuccessfulParcelList>
        
      },
      {
        path:'returnparcel',
        element:<ReturnParcelList></ReturnParcelList>
        
      },
        //Universal
      {
        path:'profile',
        element:<MyProfile></MyProfile>
        
      },
      {
        path:'updateparcel/:id',
        element:<Updateparcel></Updateparcel>,
        loader: ({ params }) => fetch(`http://localhost:5000/indivisualparcels/${params.id}`) ,
        
      },
       //User Area 

  
      {
        path:'addparcel',
        element:<AddParcel></AddParcel>
        
      },
      {
        path:'userhome',
        element:<UserHome></UserHome>
        
      },

      {
        path:'viewparcel',
        element:<ViewParcel></ViewParcel>
        
      },

      {
        path:'mydeliveryparcel',
        element:<AllDeliveryParcel></AllDeliveryParcel>
        
      },
      {
        path:'pinfo',
        element:<PaymentInformation></PaymentInformation>
        
      },
      {
        path:'paymentslip',
        element:<PaymentSlip></PaymentSlip>
        
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </HelmetProvider>
      </QueryClientProvider>
      </React.StrictMode>,
)

