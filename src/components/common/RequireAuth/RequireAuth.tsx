import { Navigate, Outlet } from "react-router-dom";
import { useGetAuthStatusQuery } from "../../../store/api/auth";

const RequireAuth = () => {
	const { data, error, isLoading } = useGetAuthStatusQuery();
	const isAuthenticated =
		localStorage.getItem("isAuthenticated") === "true" || data?.isAuthenticated;

	if (isLoading) {
		return <h2 className='text-center mt-5'>Loading...</h2>;
	}

	if (error) {
		return <h2 className='text-center mt-5'>Doslo je do neocekivane greske.</h2>;
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
