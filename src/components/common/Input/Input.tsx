import "./Input.scss";

type Props = {
	label?: string;
	inputClassName?: string;
} & React.HTMLProps<HTMLInputElement>;

const Input = ({ label, className, inputClassName, ...props }: Props) => {
	const inputId = label?.toLowerCase();

	return (
		<div className={`input-container ${className || ""}`}>
			{label && <label htmlFor={inputId}>{label}</label>}
			<div className='input-image-container'>
				<input id={inputId} className={`input ${inputClassName || ""}`} {...props} />
			</div>
		</div>
	);
};

export default Input;
