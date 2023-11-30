import axios from 'axios';
export const axiosSecure = axios.create({
    baseURL: 'https://sadatfast-server.vercel.app'
})
const UseAxioSecure = () => {
    return axiosSecure;

};

export default UseAxioSecure;