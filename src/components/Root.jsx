
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Copyright from './Footer/Copyright';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

import './root.css';

const Root = () => {

    return (
        <div >
            <Navbar></Navbar>
            <Toaster />
            <Outlet></Outlet>
            <Footer></Footer>
            <Copyright></Copyright>
        </div>
    );
};

export default Root;