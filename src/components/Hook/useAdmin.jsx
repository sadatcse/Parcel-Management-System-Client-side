import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxioSecure";

const useAdmin = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userType, isLoading } = useQuery({
        queryKey: [user?.email, 'userType'],
        enabled: !authLoading && user !== undefined, 
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                let userType = 0; 

                if (res.data === 'admin') {
                    userType = 1;
                } else if (res.data === 'user') {
                    userType = 2;
                } else if (res.data === 'deliveryman') {
                    userType = 3;
                }

                console.log(userType);
                return userType;
            } catch (error) {
            
                console.error("Error fetching user type:", error);
                throw new Error("Failed to fetch user type");
            }
        }
    });

    const loading = authLoading || isLoading;
    const userTypeReady = userType !== undefined;

    return { loading, userType: userTypeReady ? userType : 0 };
};

export default useAdmin;