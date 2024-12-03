import React from "react";
import "./HomePage.scss";
import { useAppSelector } from "../../../store/hooks";
import AdminPage from "../../common/AdminPage/AdminPage";
import UserPage from "../../common/UserPage/UserPage";

export default function HomePage() {
	const { role } = useAppSelector(state => state.role);

	return (
		<div className='homepage-container'>{role === "admin" ? <AdminPage /> : <UserPage />}</div>
	);
}
