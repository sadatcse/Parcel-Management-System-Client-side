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
import SuccessfulPaymentList from './components/Page/Dashboard/Admin/SuccessfulPaymentList';
import MyDeliveryParcelList from './components/Page/Dashboard/Delivery/MyDeliveryParcelList';
import MyReviews from './components/Page/Dashboard/Delivery/MyReviews';
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
import PrivateRoot from './components/Root/PrivateRoot';
import AdminRoute from './components/Root/AdminRoute';





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
    element: <PrivateRoot><Dashboard></Dashboard></PrivateRoot>,
    errorElement: <Error404></Error404>,
    children: [
      //admin area
      {
        path:'alluser',
        element:<AdminRoute><AllUser></AllUser></AdminRoute>
        
      },
      {
        path:'adminhome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        
      },
      {
        path:'alldelivery',
        element:<AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>,
        loader: () => fetch('http://localhost:5000/deliveryman')
        
      },
      {
        path:'duepayment',
        element:<AdminRoute><AllDuePaymentList></AllDuePaymentList></AdminRoute>
        
      },
      {
        path:'allparcel',
        element:<AdminRoute><AllParcel></AllParcel></AdminRoute>
        
      },
      {
        path:'successfulpayment',
        element:<AdminRoute><SuccessfulPaymentList></SuccessfulPaymentList></AdminRoute>
        
      },

       //Delivery man area
       {
        path:'deliveryhome',
        element:<PrivateRoot><DeliveryHome></DeliveryHome></PrivateRoot>
        
      },

       {
        path:'mydelivery',
        element:<PrivateRoot><MyDeliveryParcelList></MyDeliveryParcelList></PrivateRoot>
        
      },
      {
        path:'myreviews',
        element:<PrivateRoot><MyReviews></MyReviews></PrivateRoot>
        
      },
        //Universal
      {
        path:'profile',
        element:<PrivateRoot><MyProfile></MyProfile></PrivateRoot>
        
      },
      {
        path:'updateparcel/:id',
        element:<PrivateRoot><Updateparcel></Updateparcel></PrivateRoot>,
        loader: ({ params }) => fetch(`http://localhost:5000/indivisualparcels/${params.id}`) ,
        
      },
       //User Area 

  
      {
        path:'addparcel',
        element:<PrivateRoot><AddParcel></AddParcel></PrivateRoot>
        
      },
      {
        path:'userhome',
        element:<PrivateRoot><UserHome></UserHome></PrivateRoot>
        
      },

      {
        path:'viewparcel',
        element:<PrivateRoot><ViewParcel></ViewParcel></PrivateRoot>
        
      },

      {
        path:'mydeliveryparcel',
        element:<PrivateRoot><AllDeliveryParcel></AllDeliveryParcel></PrivateRoot>
        
      },
      {
        path:'pinfo',
        element:<PrivateRoot><PaymentInformation></PaymentInformation></PrivateRoot>
        
      },
      {
        path:'paymentslip',
        element:<PrivateRoot><PaymentSlip></PaymentSlip></PrivateRoot>
        
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

