import {
	ADMINSIGNUP,
	ADMINERROR,
	ERROR,
	LOADING,
	ERRORCOMPLETE,
} from '../types/admin_type';

export const admin_Initialstate = {
	error: '',
	iserror: false,
	success: '',
	issuccess: false,
	loading: false,
};
export const admin_redux = (state = admin_Initialstate, action) => {
	switch (action.type) {
		case ADMINSIGNUP:
			return {
				...state,
			};
		case ERROR:
			return {
				...state,
				iserror: true,
				issuccess: false,
				error: action.payload.error,
				success: '',
			};
		case LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case ERRORCOMPLETE:
			return {
				...state,
				loading: false,
				iserror: false,
				error: '',
			};
	}
};
