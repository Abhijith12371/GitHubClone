import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AppContext";

const LikeProfile = ({ userProfile }) => {
	const { authUser } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const handleLikeProfile = async () => {
		setIsLoading(true);
		try {
            const res = await fetch(`http://localhost:5000/api/users/like/${userProfile.login}`, {
                method: "POST",
                credentials: "include",
            });
			const data = await res.json();

			if (data.error) throw new Error(data.error);
			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (!authUser) return null;

	return (
		<button
			className={`p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
			onClick={isLoading ? null : handleLikeProfile}
			disabled={isLoading}
		>
			<FaHeart size={16} /> {isLoading ? 'Liking...' : 'Like Profile'}
		</button>
	);
};

export default LikeProfile;
