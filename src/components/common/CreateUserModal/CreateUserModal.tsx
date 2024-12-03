import React, { useState } from "react";
import "./CreateUserModal.scss";
import Input from "../Input/Input";
import { useCreateUserMutation } from "../../../store/api/user";

interface Props {
	onClose: () => void;
}

function CreateUserModal({ onClose }: Props) {
	const [createUser] = useCreateUserMutation();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createUser(formData).unwrap();
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<h2>Create New User</h2>
				<form onSubmit={handleSubmit} className='form'>
					<div className='form-group'>
						<label>First Name</label>
						<Input
							type='text'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							required
							className='form-input'
						/>
					</div>

					<div className='form-group'>
						<label>Last Name</label>
						<Input
							type='text'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							className='form-input'
							required
						/>
					</div>

					<div className='form-group'>
						<label>Email</label>
						<Input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='form-input'
							required
						/>
					</div>

					<div className='modal-buttons'>
						<button type='submit'>Create</button>
						<button type='button' onClick={onClose}>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateUserModal;
