import {
	NAME,
	BUSINESS,
	INFO,
	EMAIL,
	PASSWORD,
	REG_ERROR,
} from '../../context/action_type';
export const name = (dispatch, email, first, last, regerror) => {
	if (!first || !last) {
		dispatch({
			type: REG_ERROR,
			payload: { regerror, message: 'All fields should be filled' },
		});
	} else if (first.length < 3 || last.length < 3) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Both fields should have 3 or more characters',
			},
		});
	} else {
		dispatch({ type: NAME, payload: { email } });
	}
};
export const email = (
	dispatch,
	business,
	email,
	username,
	regerror,
) => {
	if (!email || !username) {
		dispatch({
			type: REG_ERROR,
			payload: { regerror, message: 'All fields should be filled' },
		});
	}
	dispatch({ type: EMAIL, payload: { business } });
};
export const business = (
	dispatch,
	info,
	company,
	type,
	state,
	regerror,
) => {
	if (!company && !type && !state) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Company Name field should be filled',
			},
		});
	}
	dispatch({ type: BUSINESS, payload: { info } });
};
export const info = (dispatch, password, phone1, phone, regerror) => {
	if (!phone && !phone1) {
		dispatch({
			type: REG_ERROR,
			payload: {
				regerror,
				message: 'Atleast One Phone No is required',
			},
		});
	}
	dispatch({ type: INFO, payload: { password } });
};
export const password = (dispatch, name) => {
	dispatch({ type: PASSWORD, payload: { name } });
};
