import axios from 'axios';

import {
	ADMINSIGNUP,
	ERROR,
	LOADING,
	ERRORCOMPLETE,
} from '../types/admin_type';
export const adminLogin = async (
	data,
	dispatch,
	id,
	navigate,
	loading,
) => {
	const { adm, adminref } = data;
	try {
		const response = await axios.post(
			`
		http://localhost:3500/adminlogin`,
			data,
		);

		setTimeout(() => {
			setTimeout(() => {
				navigate(`/v1/${id}/admin/dashboard`);
			}, 3000);
			window.localStorage.setItem(
				'admin_log',
				JSON.stringify(response.data),
			);

			dispatch({
				type: ADMINSIGNUP,
				payload: {
					success: response?.data?.message,
					loading,
				},
			});
		}, 2000);

		dispatch({ type: LOADING, loading });
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: ERRORCOMPLETE,
			});
		}, 2000);

		setTimeout(() => {
			if (error?.message === 'Network Error') {
				navigate('/network');
			}
		}, 3000);
		dispatch({
			type: ERROR,
			payload: { error: error?.response?.data?.message },
		});
	}
};
