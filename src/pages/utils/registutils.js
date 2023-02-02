import {
	NAME,
	BUSINESS,
	INFO,
	EMAIL,
	PASSWORD,
} from '../../context/action_type';
export const name = (dispatch, email) => {
	dispatch({ type: NAME, payload: { email } });
};
export const email = (dispatch, business) => {
	dispatch({ type: EMAIL, payload: { business } });
};
export const business = (dispatch, info) => {
	dispatch({ type: BUSINESS, payload: { info } });
};
export const info = (dispatch, password) => {
	dispatch({ type: INFO, payload: { password } });
};
export const password = (dispatch, name) => {
	dispatch({ type: PASSWORD, payload: { name } });
};
