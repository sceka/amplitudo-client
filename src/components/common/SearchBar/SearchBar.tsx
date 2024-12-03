import React, { Dispatch, SetStateAction, useCallback } from "react";
import "./SearchBar.scss";
import Input from "../Input/Input";
import { debounce } from "lodash";

type Props = {
	setQuery: Dispatch<SetStateAction<string>>;
	query: string;
};

export default function SearchBar({ setQuery, query }: Props) {
	const debouncedSetQuery = useCallback(
		debounce((newQuery: string) => {
			setQuery(newQuery);
		}, 100),
		[setQuery]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		debouncedSetQuery(newQuery);
	};
	return <Input placeholder='Search for user...' value={query} onChange={handleSearchChange} />;
}
