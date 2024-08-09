'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/AdminTable/adminTable.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { UserService } from '@/services/user.service';

import { convertMongoDate } from '@/utils/data/convertMongoDate';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

export function useUsers() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debounceSearch = useDebounce({ searchTerm, delay: 500 });

	const queryData = useQuery(
		['userList', debounceSearch],
		() => UserService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)],
					})
				),
			onError: (error) => {
				toastError(error, 'User list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		['deleteUser'],
		(userId: string) => UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete user');
			},
			onSuccess: () => {
				toastr.success('Delete user', 'delete was successful');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({ ...queryData, handleSearch, searchTerm, deleteAsync }),
		[queryData, searchTerm, deleteAsync]
	);
}
