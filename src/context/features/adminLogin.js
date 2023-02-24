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
	console.log(data.current);
	try {
		const response = await axios.post(
			`
		http://localhost:3500/adminlogin`,
			data,
		);

		setTimeout(() => {
			setTimeout(() => {
				navigate(`/admin/v1/${id}/admin-panel`);
			}, 2000);
			window.localStorage.setItem(
				'admin_log',
				JSON.stringify(response.data),
			);
			console.log(response.data);
			dispatch({
				type: ADMINSIGNUP,
				payload: {
					success: response?.data?.message,
				},
			});
		}, 3000);

		dispatch({ type: LOADING, loading });
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: ERRORCOMPLETE,
			});
		}, 5000);

		dispatch({
			type: ERROR,
			payload: { error: error?.response?.data?.message },
		});
	}
};
