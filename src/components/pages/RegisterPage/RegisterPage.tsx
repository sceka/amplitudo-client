import React, { useState } from "react";
import "./RegisterPage.scss";
import { UserType } from "../../../util/types";
import { genderItems, inputFields } from "../../../util/constants";
import Input from "../../common/Input/Input";
import { useRegisterUserMutation } from "../../../store/api/register";
import Dropdown from "../../common/Dropdown/Dropdown";
import { countries } from "countries-list";
import Button from "../../common/Button/Button";

export default function RegisterPage() {
	const [user, setUser] = useState<UserType>();
	const [files, setFiles] = useState<{ [key: string]: File | null }>({ image: null, cv: null });
	const [registerUser, { error }] = useRegisterUserMutation();

	function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value, files } = e.target;

		if (name === "image" || name === "cv") {
			setFiles(prev => ({
				...prev,
				[name]: files?.[0] as File | null
			}));
		} else {
			setUser(
				prev =>
					({
						...prev,
						[name]: value
					} as UserType)
			);
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData();
		if (user?.email) {
			Object.entries(user).forEach(([key, value]) => {
				if (value !== undefined) {
					formData.append(key, value as string);
				}
			});

			if (files.cv) formData.append("cv", files.cv);
			if (files.image) formData.append("image", files.image);
		}

		try {
			await registerUser(formData).unwrap();
			alert("User registered successfully!");
			window.location.reload();
		} catch (error) {
			console.error("Registration failed:", error);
		}
	}

	const countryNames = Object.values(countries).map(country => country.name);

	function onSelectCountry(selectedCountry: string) {
		setUser(
			prev =>
				({
					...prev,
					country: selectedCountry
				} as UserType)
		);
	}

	function onSelectGender(gender: string) {
		setUser(
			prev =>
				({
					...prev,
					gender: gender
				} as UserType)
		);
	}

	function onClickGoogleLogin() {
		window.location.replace("http://localhost:3001/api/auth/google");
	}

	return (
		<div className='register-page-container'>
			<form className='register-page-modal' onSubmit={handleSubmit}>
				<h2>Create Your Account</h2>
				{inputFields.map(({ name, type, placeholder, required, accept }) => (
					<div className='input-container' key={name}>
						<Input
							type={type}
							name={name}
							placeholder={placeholder}
							onChange={onChangeInput}
							required={required}
							accept={accept}
						/>
					</div>
				))}
				<div className='input-container'>
					<Dropdown options={countryNames} onSelect={onSelectCountry} />
				</div>
				<div className='input-container'>
					<Dropdown options={genderItems} onSelect={onSelectGender} />
				</div>
				<Button type='submit' title='Register' />
				<Button title='Register with Google' onClick={onClickGoogleLogin} />
			</form>
		</div>
	);
}
