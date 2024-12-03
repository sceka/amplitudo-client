import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePasswordMutation } from "../../../store/api/user";
import { useCheckLinkFormQuery } from "../../../store/api/linkForm";
import Button from "../../common/Button/Button";

const CreatePasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const searchParams = new URLSearchParams(window.location.search);
	const userId = searchParams.get("userId");

	const navigate = useNavigate();
	const [sendPassword] = useCreatePasswordMutation();
	const { error, isLoading } = useCheckLinkFormQuery(userId);

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		navigate("/login");
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!userId) {
			alert("Invalid link. Please try again.");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			await sendPassword({ password, userId });
			navigate("/");
		} catch (error) {
			console.error(error);
			alert("Error creating password. Please try again.");
		}
	};

	function onClickGoogleLogin() {
		window.location.replace("http://localhost:3001/api/auth/google");
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='confirmPassword'>Confirm Password:</label>
				<input
					type='password'
					id='confirmPassword'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</div>
			<Button type='submit' title='Create Password' />

			<Button title='Login with Google' onClick={onClickGoogleLogin} />
		</form>
	);
};

export default CreatePasswordPage;
