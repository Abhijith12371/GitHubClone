import React from "react";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Logout = () => {
    const { authUser, setAuthUser } = useAuthContext();

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", { 
                method: "GET", 
                credentials: "include" 
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
            }

            const data = await res.json();
            console.log(data);
            setAuthUser(null); // Reset user state on logout

            // Show success toast
            toast.success("Logout successful!"); 
        } catch (error) {
            toast.error("Logout failed: " + error.message);
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <img src={authUser?authUser.avatarUrl:"github.svg"} className='w-10 h-10 rounded-full border border-gray-800' alt="User Avatar"/>

            <div
                className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'
                onClick={handleLogout}
            >
                <MdLogout size={22} />
            </div>
        </>
    );
};

export default Logout;
