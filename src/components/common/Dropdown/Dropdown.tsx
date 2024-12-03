import React, { useState } from "react";
import "./Dropdown.scss";

type DropdownProps = {
	options: string[];
	onSelect: (selectedValue: string) => void;
	placeholder?: string;
};

export default function Dropdown({
	options,
	onSelect,
	placeholder = "Select an option"
}: DropdownProps) {
	const [selectedOption, setSelectedOption] = useState<string>("");

	const handleSelect = (option: string) => {
		setSelectedOption(option);
		onSelect(option);
	};

	return (
		<div className='dropdown'>
			<button className='dropdown-button'>{selectedOption || placeholder}</button>
			<ul className='dropdown-menu'>
				{options.map((option, index) => (
					<li key={index} className='dropdown-item' onClick={() => handleSelect(option)}>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
}
