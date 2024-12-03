import React, { useEffect, useState } from "react";
import "./UserPage.scss";
import { useGetUserQuery, useUpdateUserMutation } from "../../../store/api/user";
import { UserType } from "../../../util/types";
import Input from "../Input/Input";
import { inputFields } from "../../../util/constants";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";

export default function UserPage() {
	const { data: user, isLoading, error } = useGetUserQuery();
	const [updateUser] = useUpdateUserMutation();
	const [formData, setFormData] = useState<UserType | null>(null);

	useEffect(() => {
		if (user?.dateOfBirth instanceof Date && !isNaN(user.dateOfBirth.getTime())) {
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			setFormData(user);
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = e.target;

		if (type === "file" && files) {
			setFormData(
				prevData =>
					({
						...prevData,
						[name]: files[0]
					} as UserType)
			);
		} else if (name === "dateOfBirth") {
			setFormData(
				prevData =>
					({
						...prevData,
						[name]: value ? new Date(value) : null
					} as UserType)
			);
		} else {
			setFormData(
				prevData =>
					({
						...prevData,
						[name]: value
					} as UserType)
			);
		}
	};

	const getFormattedDate = (date: Date | null | undefined) => {
		if (date instanceof Date && !isNaN(date.getTime())) {
			return date.toISOString().split("T")[0];
		}
		return "";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateUser(formData as UserType).unwrap();
		} catch (err) {
			console.error("Error updating user:", err);
		}
	};

	return (
		<>
			<Navbar />
			<div className='user-page'>
				{isLoading && <p>Loading...</p>}
				{error && <p>Error loading user data</p>}
				{user && (
					<form onSubmit={handleSubmit}>
						{inputFields.map(({ name, type, placeholder }) => (
							<Input
								key={name}
								label={name}
								type={type}
								name={name}
								placeholder={placeholder}
								value={
									type === "file"
										? undefined
										: name === "dateOfBirth"
										? user?.dateOfBirth && getFormattedDate(user?.dateOfBirth)
										: (formData?.[name as keyof UserType] as string) || ""
								}
								onChange={handleChange}
							/>
						))}
						<Button type='submit' title='Save' />
					</form>
				)}
			</div>
		</>
	);
}
