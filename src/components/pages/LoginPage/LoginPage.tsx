import React, { useState } from "react";
import "./LoginPage.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { useLoginMutation } from "../../../store/api/auth";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../../../store/reducers/roleSlice";

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login] = useLoginMutation();

	const onClickLogin = async () => {
		try {
			const role = await login({ email, password }).unwrap();
			dispatch(setRole(role));
			localStorage.setItem("role", role);
			localStorage.setItem("isAuthenticated", "true");

			navigate("/");
		} catch (err) {
			console.error("Login failed:", err);
			alert("Something went wrong");
		}
	};

	const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword((e.target as HTMLInputElement).value);
	};

	const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail((e.target as HTMLInputElement).value);
	};

	const onClickRegister = () => {
		navigate("/register");
	};

	const onClickGoogleLogin = async () => {
		window.location.href = "http://localhost:3001/api/auth/google";
	};

	return (
		<div className='container'>
			<div className='login-modal'>
				<h1>Login</h1>
				<div className='login-input'>
					<Input onChange={onChangeEmail} placeholder='Email' />
				</div>
				<div className='login-input'>
					<Input onChange={onChangePassword} type='password' placeholder='Password' />
				</div>
				<Button title='Log In' onClick={onClickLogin} />

				<div className='google-login' onClick={onClickGoogleLogin}>
					<Button title='Login with Google' />
				</div>

				<p className='register-link' onClick={onClickRegister}>
					Don't have an account? Register here.
				</p>
			</div>
		</div>
	);
}
