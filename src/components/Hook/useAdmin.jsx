import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxioSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userType} = useQuery({
        queryKey: [user?.email, 'userType'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            let userType = 0; // Default value

            if (res.data === 'admin') {
                userType = 1;
            } else if (res.data === 'user') {
                userType = 2;
            } else if (res.data === 'deliveryman') {
                userType = 3;
            }

            console.log(userType);
            return userType;
        }
    });

    return userType;
};

export default useAdmin;