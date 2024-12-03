export type UserType = {
	_id: string;
	firstName: string;
	lastName: string;
	dateOfBirth?: Date;
	country?: string;
	image?: File;
	gender?: "male" | "female" | "other";
	school?: string;
	cv?: File;
	email: string;
	password: string;
};

export type LinkForm = {
	_id: string;
	userId: string;
	active: boolean;
};
