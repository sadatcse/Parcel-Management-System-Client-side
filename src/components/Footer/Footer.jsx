import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
    <aside>
    <img src="https://i.ibb.co/Y8RvjVn/logo.png" alt="Company Logo" className="h-12 mb-4 md:mr-4" />
    <div>
                <p className="mb-2">17/2, Dhanmondi 3/A, Dhaka-1209</p>
                <p className="mb-2">E-mail: info@sadatfast.com.bd</p>
                <p className="mb-2">Hotline: 09678-045045</p>
              </div>
    </aside> 
    <nav>
      <header className="footer-title">Services</header> 
      <a className="link link-hover">Home Delivery</a>
      <a className="link link-hover">Warehousing</a>
      <a className="link link-hover">Pick and Drop</a>
      <a className="link link-hover">Bulk Delivery</a>
    </nav> 
    <nav>
      <header className="footer-title">Company</header> 
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
      <a className="link link-hover">Our Goal</a>
    </nav> 
    <nav>
      <header className="footer-title">EARN</header> 
      <a className="link link-hover">Become Marchent</a>
      <a className="link link-hover">Become Rider</a>
      <a className="link link-hover">Become Delivery Man</a>
    </nav>
  </footer>
  );
};

export default Footer;
