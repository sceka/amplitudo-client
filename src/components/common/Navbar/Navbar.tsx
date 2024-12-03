import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import { useLogoutMutation } from "../../../store/api/auth";
import "./Navbar.scss";
import { useAppSelector } from "../../../store/hooks";
import Button from "../Button/Button";

export default function Navbar() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const [logout] = useLogoutMutation();
	const { role } = useAppSelector(state => state.role);

	const handleCreateUser = () => {
		setIsModalOpen(true);
	};

	const handleLogout = async () => {
		await logout().unwrap();
		localStorage.removeItem("role");
		localStorage.removeItem("isAuthenticated");
		navigate("/login");
	};

	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				<h1>My App</h1>
				<div className='navbar-buttons'>
					{role === "admin" && (
						<Button
							onClick={handleCreateUser}
							className='navbar-button'
							title='Create New User'
						/>
					)}
					<Button onClick={handleLogout} className='navbar-button' title='Logout' />
				</div>
			</div>

			{isModalOpen && <CreateUserModal onClose={() => setIsModalOpen(false)} />}
		</nav>
	);
}
