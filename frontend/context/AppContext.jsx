import { useEffect, useState, useContext, createContext } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [Loading,setLoading]=useState(true)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                setLoading(true)
                const res = await fetch("http://localhost:5000/api/auth/check",{credentials:"include"});

                // Check if response is OK
                if (!res.ok) {
                    const errorText = await res.text(); // Get the HTML or error response
                    throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
                }

                const data = await res.json();
                // console.log("Fetched User Data:", data.user); // Log the entire response
                setAuthUser(data.user); // Set the user state
            } catch (error) {
                toast.error("An error occurred");
                console.error("Error fetching user data:", error); // Log the error to the console
            }
            finally{
                setLoading(false)
            }
        };

        checkUserLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser,Loading}}>
            {children}
        </AuthContext.Provider>
    );
};
