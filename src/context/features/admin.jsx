import axios from 'axios';

import {
	ERROR,
	SIGNUP,
	LOADING,
	ERROR_REG,
	CLEANUP_PASSWORD,
} from '../action_type';
const baseUrl = process.env.REACT_APP_BASE;
export const createAdmin = async (
	navigate,
	dispatch,
	loading,
	data,
	passmessage,
	setMessage,
) => {
	try {
		if (passmessage.current === 'Strong  password') {
			const response = await axios.post(
				`
https://gaminbackendz.onrender.com/register`,
				data.current,
			);

			setTimeout(() => {
				setTimeout(() => {
					navigate('/');
					window.location.reload();
				}, 3000);
				window.localStorage.setItem(
					'profile',
					JSON.stringify(response.data),
				);

				dispatch({
					type: SIGNUP,
					payload: {
						modalcontent: response?.data?.message,
						loading,
					},
				});
			}, 2000);
			console.log(response?.data);
			dispatch({ type: LOADING, loading });
		} else {
			setTimeout(() => {
				setMessage(() => {
					return '';
				});
			}, 5000);
			setMessage(() => {
				return 'Weak password,add numerics,alphanumerics,numbers,caps.';
			});
		}
	} catch (error) {
		console.log(error?.response?.data?.message);
		dispatch({
			type: ERROR,
			payload: { modalcontent: error?.response?.data?.message },
		});
	}
};

export const adminLogin = async (
	navigate,
	dispatch,
	loading,
	data,
) => {
	try {
		const response = await axios.post(
			`
		https://gaminbackendz.onrender.com/login`,
			data.current,
		);

		setTimeout(() => {
			setTimeout(() => {
				navigate('/');
				window.location.reload();
			}, 3000);
			window.localStorage.setItem(
				'profile',
				JSON.stringify(response.data),
			);

			dispatch({
				type: SIGNUP,
				payload: {
					modalcontent: response?.data?.message,
					loading,
				},
			});
		}, 2000);

		dispatch({ type: 'LOADING', loading });
	} catch (error) {
		console.log(error?.response?.data?.message);
		dispatch({
			type: ERROR,
			payload: { modalcontent: error?.response?.data?.message },
		});
	}
};
