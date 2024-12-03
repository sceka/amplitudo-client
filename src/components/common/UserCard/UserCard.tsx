import React from "react";
import "./UserCard.scss";
import { UserType } from "../../../util/types";
import { useAppSelector } from "../../../store/hooks";
import { useDeleteUserMutation } from "../../../store/api/user";
import { inputFields } from "../../../util/constants";

type Props = {
	user: UserType;
	refetchUsers: () => void;
};

export default function UserCard({ user, refetchUsers }: Props) {
	const { role } = useAppSelector(state => state.role);
	const [deleteUser] = useDeleteUserMutation();

	const handleDelete = async (userId: string) => {
		try {
			await deleteUser(userId);
			alert("User deleted successfully");
			refetchUsers();
		} catch (err) {
			alert("Error deleting user");
		}
	};

	return (
		<div className='user-card-container'>
			<div className='user-info'>
				<div className='user-info-item'>
					<label>First Name</label>
					<span>{user.firstName}</span>
				</div>

				<div className='user-info-item'>
					<label>Last Name</label>
					<span>{user.lastName}</span>
				</div>
				<div className='user-info-item'>
					<label>Email</label>
					<span>{user.email}</span>
				</div>
				{user.dateOfBirth && (
					<div className='user-info-item'>
						<label>Date of Birth</label>
						<span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
					</div>
				)}
				{user.country && (
					<div className='user-info-item'>
						<label>Country</label>
						<span>{user.country}</span>
					</div>
				)}
				{user.gender && (
					<div className='user-info-item'>
						<label>Gender</label>
						<span>{user.gender}</span>
					</div>
				)}
				{user.school && (
					<div className='user-info-item'>
						<label>School</label>
						<span>{user.school}</span>
					</div>
				)}
			</div>

			{role === "admin" && (
				<button className='delete-button' onClick={() => handleDelete(user._id)}>
					Delete User
				</button>
			)}
		</div>
	);
}
