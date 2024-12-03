import React, { useEffect } from "react";
import "./Pagination.scss";
import Button from "../Button/Button";

type Props = {
	currentPage: number;
	onPageChange: (page: number) => void;
	totalPages: number;
};

function Pagination({ totalPages, currentPage, onPageChange }: Props) {
	const handleClick = (page: number) => {
		if (page > 0 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='pagination-container'>
			<Button
				className='pagination-button'
				onClick={() => handleClick(currentPage - 1)}
				disabled={currentPage === 1}
				title='Previous'
			/>
			{pageNumbers.map(pageNumber => (
				<Button
					key={pageNumber}
					className={`pagination-page ${currentPage === pageNumber ? "active" : ""}`}
					onClick={() => handleClick(pageNumber)}
					title={String(pageNumber)}
				/>
			))}
			<Button
				className='pagination-button'
				onClick={() => handleClick(currentPage + 1)}
				disabled={currentPage === totalPages}
				title='Next'
			/>
		</div>
	);
}

export default Pagination;
