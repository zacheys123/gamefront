import {
	JWT,
	GETUSER,
	ERROR,
	SIGNUP,
	LOADING,
	EMPTY,
	WRONGPASSWORD,
	PASSWORDLENGTH,
	CLOSEMODAL,
	SUCCESS,
	PROFILE,
	NAME,
	EMAIL,
	BUSINESS,
	INFO,
	PASSWORD,
} from '../action_type';
export const main_redux = (state = {}, action) => {
	switch (action.type) {
		case 'THEME':
			return {
				...state,
				istheme: !action.payload,
			};
		case GETUSER:
			return {
				...state,
				user: action.payload.user,
				userInfo: action.payload.userInfo,
			};
		case ERROR:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				error: true,
				success: false,
			};
		case SUCCESS:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				error: false,
				success: true,
			};
		case EMPTY:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case WRONGPASSWORD:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case PASSWORDLENGTH:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};

		case CLOSEMODAL:
			return {
				...state,
				ismodal: false,
			};

		// signup admin

		case SIGNUP:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
				logged: !state.logged,
				error: false,
			};
		case JWT:
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
			};
		case LOADING:
			return {
				...state,
				loading: !action.loading,
			};
		case PROFILE:
			return {
				...state,
				profile: !action.profile,
			};

		//
		case NAME:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
				logged: !state.logged,
				error: false,
			};
		case EMAIL:
			return {
				...state,
				user: action.payload,
			};
		case BUSINESS:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
			};
		case INFO:
			return {
				...state,
				loading: !action.loading,
			};
		case PASSWORD:
			return {
				...state,
				profile: !action.profile,
			};

		default:
			return {
				...state,
			};
	}
};
