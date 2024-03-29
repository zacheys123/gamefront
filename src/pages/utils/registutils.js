import {
	NAME,
	BUSINESS,
	INFO,
	EMAIL,
	PASSWORD,
	REG_ERROR,
	ERROR_EMAIL,
	CLEANUP,
	CLEANUP_UTILS,
	SECRET,
} from '../../context/types/action_type';
import axios from 'axios';
export const name = (dispatch, email, first, last, regerror) => {
	if (!first || !last) {
		dispatch({
			type: REG_ERROR,
			payload: { regerror, message: 'All fields should be filled' },
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else if (first.length < 3 || last.length < 3) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Both fields should have 3 or more characters',
			},
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else {
		dispatch({ type: NAME, payload: { email } });
	}
};
export const email = async (
	dispatch,
	business,
	email,
	username,
	regerror,
	user,
) => {
	console.log();

	try {
		if (!email && !username) {
			dispatch({
				type: REG_ERROR,
				payload: {
					regerror,
					message: 'Both fields should be filled',
				},
			});
			setTimeout(() => {
				dispatch({
					type: CLEANUP_UTILS,
				});
			}, 3000);
		} else if (!email) {
			dispatch({
				type: REG_ERROR,
				payload: {
					regerror,
					message: 'Email field should be filled',
				},
			});
			setTimeout(() => {
				dispatch({
					type: CLEANUP_UTILS,
				});
			}, 3000);
		} else if (!username) {
			dispatch({
				type: REG_ERROR,
				payload: {
					regerror,
					message: 'username field should be filled',
				},
			});
			setTimeout(() => {
				dispatch({
					type: CLEANUP_UTILS,
				});
			}, 3000);
		} else {
			const response = await axios.post(
				'https://gamebackend.onrender.com/check',
				user?.current,
			);

			console.log(response.data);
			if (response?.data?.success === true) {
				dispatch({ type: EMAIL, payload: { business } });
			}
		}
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: CLEANUP,
			});
		}, 5000);
		dispatch({
			type: ERROR_EMAIL,
			payload: {
				message: error.response?.data?.message,
			},
		});
	}
};
export const business = (
	dispatch,
	info,
	company,

	regerror,
) => {
	if (!company) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Company Name field should be filled',
			},
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else {
		dispatch({ type: BUSINESS, payload: { info } });
	}
};
export const info = (dispatch, password, phone, regerror) => {
	if (!phone) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Atleast One Phone No is required',
			},
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else {
		dispatch({ type: INFO, payload: { password } });
	}
};
export const password = (dispatch, name) => {
	dispatch({ type: PASSWORD, payload: { name } });
};

//
export const secret = (
	dispatch,
	password,
	secret_question,
	secret,

	regerror,
) => {
	if (!secret_question) {
		dispatch({
			type: REG_ERROR,
			payload: { regerror, message: 'Secret Question is required' },
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else if (!secret) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Secret response must be entered',
			},
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else if (!secret_question && !secret) {
		dispatch({
			type: REG_ERROR,
			payload: { regerror, message: 'All fields should be filled' },
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else if (secret.length < 3) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'A secret should have more than 4 characters',
			},
		});
		setTimeout(() => {
			dispatch({
				type: CLEANUP_UTILS,
			});
		}, 3000);
	} else {
		dispatch({ type: SECRET, payload: { password } });
	}
};
