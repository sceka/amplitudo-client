import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import UserCard from "../UserCard/UserCard";
import { useGetUsersQuery } from "../../../store/api/user";
import Pagination from "../Pagination/Pagination";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchUsersQuery } from "../../../store/api/search";

export default function AdminPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [query, setQuery] = useState<string>("");
	const usersPerPage = 10;

	const { data: queryData } = useSearchUsersQuery(query, {
		skip: query.length === 0,
		refetchOnMountOrArgChange: true
	});

	const {
		data: { users = [], totalCount = 0 } = {},
		isLoading,
		error,
		refetch
	} = useGetUsersQuery({
		page: currentPage - 1,
		limit: usersPerPage
	});

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		refetch();
	};

	const displayedUsers = query ? queryData : users;
	const displayedTotalCount = query ? queryData?.length : totalCount;

	useEffect(() => {
		if ((displayedUsers?.length === 0 || displayedUsers === queryData) && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}, [queryData, displayedUsers, currentPage]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Something went wrong</div>;

	const totalPages = Math.ceil((displayedTotalCount as number) / usersPerPage);

	return (
		<div>
			<Navbar />
			<SearchBar setQuery={setQuery} query={query} />
			<div className='admin-page-container'>
				<div className='user-card-wrapper'>
					{displayedUsers?.map(user => (
						<UserCard key={user._id} user={user} refetchUsers={refetch} />
					))}
				</div>
			</div>
			<div style={{ paddingTop: 20 }}>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
