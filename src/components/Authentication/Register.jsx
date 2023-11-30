import { useContext, useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from './../../providers/AuthProvider';
import { updateProfile } from "firebase/auth";
import axios from 'axios';
import UseAxioSecure from '../Hook/UseAxioSecure';


const Register = () => {
  const { createUser,setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = UseAxioSecure();


    const handleRegister = e => {

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        const gender = e.target.Gender.value;
        const dateOfBirth = e.target.dateOfBirth.value
        const education =e.target.Education.value
        const streetName =e.target.StreetName.value
        const streetNumber =e.target.StreetNumber.value
        const area =e.target.Area.value
        const town =e.target.Town.value
        const postCode =e.target.PostCode.value
        const mobile =e.target.Mobile.value
        const Photourl =e.target.Photourl.value
        
        // console.log(name, email, password,gender,dateOfBirth,education,streetName,streetNumber,area,town,postCode,mobile,accepted);


        if (name.trim() === '') {
          toast.error('Please enter your name.');
          return;
        } else if (name.length < 3) {
          toast.error('Name should be at least 3 characters long.');
          return;
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
          toast.error('Please enter a valid name (alphabetic characters and spaces only).');
          return;
        } else if (password.length < 6) {
          toast.error('Password should be at least 6 characters or longer.');
          return;
        } else if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(password)) {
          toast.error('Your password should have at least one uppercase character and one special character.');
          return;
        } else if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
          toast.error('Please enter a valid email address.');
          return;
        } else if (education.trim() === '') {
          toast.error('Please enter your education.');
          return;
        } else if (streetName.trim() === '') {
          toast.error('Please enter your street name.');
          return;
        } else if (town.trim() === '') {
          toast.error('Please enter your town.');
          return;
        } else if (postCode.trim() === '') {
          toast.error('Please enter your post code.');
          return;
        } else if (!/^[0-9]{11}$/.test(mobile)) {
          toast.error('Please enter a valid 11-digit mobile number.');
          return;
        } else if (!accepted) {
          toast.error('Please accept our terms and conditions.');
          return;
        }  
          createUser(email, password)
          .then(result => {
          
            // setUser(result.user);
            updateProfile(result.user, {
              displayName: name,
              photoURL: Photourl,
              
            } );
            
            // Mongo Db Data send Area 

            const uid =result.user?.uid
            const email =result.user?.email
            const role ='user';
          
            const user = { name,Photourl,uid,mobile,email,gender,dateOfBirth,education,streetName,streetNumber,area,town,postCode};
            console.log(user);
            axiosSecure.post('/users', user)
            .then(data => {
              console.log(data);

            })
            


            .then(() => {
              toast.success('New User Create Sucessful');
              navigate(location.state?.from || "/dashboard");
              
              
            })
            .catch(error => {
              toast.error(error.message);
            });
          })
          .catch(error => {
            toast.error(error.message);
          });
        }

    return (
      
<div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-5xl mb-8 text-center">Sign up !</h2>
    <form onSubmit={handleRegister}>
      <input
        className="mb-4 relative border w-full py-2 px-4"
        type="text"
        name="name"
        placeholder="Full Name"
        id="namereg"
        required/>
      <br />
      <input className="mb-4 relative border w-full  py-2 px-4" 
      type="text" 
      name="email" 
      placeholder="Email Address" 
      id="emailreg"/>
      <br />
      <div className="mb-4 relative border">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="Gender"
          className="w-full py-2 px-4"
          required
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <br />
      <input
        className="mb-4 relative border w-full py-2 px-4"
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        id="dobreg"
        required
      />
      <br />
      <input
        className="mb-4 relative border w-full py-2 px-4"
        type="text"
        name="Education"
        placeholder="Education"
        id="educationreg"
        required
      />
      <br />
      <div className="mb-4">
        <div className="relative border">
          <input
            className="w-full py-2 px-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id="passreg"
            required
          />
          <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
        </div>
      </div>
      <br />
      <div className="mb-2">
        <input type="checkbox" name="terms" id="terms" />
        <label className="ml-2" htmlFor="terms">
          Accept our Terms and Conditions
        </label>
      </div>
      <br />
      <div className="mb-2">
        <h3>Photolink</h3>
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="Photourl" placeholder="Photourl" id="photourl" required />
        <br />
      </div>
      <div className="mb-4">
        <h3>HomeAddress</h3>
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="StreetName" placeholder="Street Name" id="streetnamereg" required />
        <br />
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="StreetNumber" placeholder="Street Number" id="streetnumberreg" required />
        <br />
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="Area" placeholder="Area" id="areareg" required />
        <br />
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="Town" placeholder="Town" id="townreg" required />
        <br />
        <input className="mb-2 relative border w-full py-2 px-4" type="text" name="PostCode" placeholder="Post Code" id="postcodereg" required />
      </div>
      <br />
      <input
        className="mb-4 relative border w-full py-2 px-4"
        type="text"
        name="Mobile"
        placeholder="Mobile"
        id="mobilereg"
        required
      />
      <br />
      <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
    </form>

    <p className="text-center">
      Already have an account? Please <Link to="/login">Login</Link>
    </p>
  </div>
</div>

    );
};

export default Register;

