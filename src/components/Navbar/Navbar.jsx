
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';

 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const useremail = user?.email;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success(`${user.displayName} logged out successfully`); 
      })
      .catch((error) => {
        toast.error('Logout failed. Please try again later.');
        console.error(error);
      });
  };
  
    const navlinks = <> 
    <li><NavLink to="/">Home</NavLink></li>

    { user && <>
            <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
        
        </>}
    </>


return (
  <div className="navbar bg-base-100 border-solid border-2 border-gray-100">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {navlinks}
        </ul>
      </div>
      <div className="flex items-center">
        <img src="https://i.ibb.co/Y8RvjVn/logo.png" alt="Company Logo" className="h-2/4 w-2/4 mr-2" />
      </div>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {navlinks}
      </ul>
    </div>
    <div className="navbar-end">
      {user ? (
        <>
          <div className='me-2'>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img onClick={toggleDropdown} src={user.photoURL} alt={user.displayName} />
              </div>
            </label>
          </div>
          <span>{user.displayName}</span>
          
        </>
      ) : (
        <NavLink to="/login">
          <button className="btn btn-warning">Login</button>
        </NavLink>
      )}
    </div>
    {isOpen && (
 <div onMouseLeave={toggleDropdown} className="absolute menu  top-10 right-20 z-10 bg-white shadow-md p-2 flex flex-col">
<a onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign out</a>

</div>
    )}
  </div>
);
};

export default Navbar;


