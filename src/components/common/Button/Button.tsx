import React from "react";
import "./Button.scss";

type Props = {
	title: string;
	className?: string;
	variant?: "primary" | "secondary";
	onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, variant = "primary", className, ...props }: Props) => {
	return (
		<button {...props} className={`button btn-${variant} ${className || ""}`}>
			<span className='button-text'>{title}</span>
		</button>
	);
};

export default Button;
