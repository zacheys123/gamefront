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
	REG_ERROR,
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

		//ALL FIELDS FOR REGISTER COMPONENT
		case NAME:
			return {
				...state,
				auth_name: true,
				auth_email: !action.payload.email,
				auth_info: false,
				auth_bs: false,
				auth_password: false,
				regerror: false,
				modalcontent: '',
			};
		case EMAIL:
			return {
				...state,
				auth_name: true,
				auth_email: false,
				auth_info: false,
				auth_bs: !action.payload.business,
				auth_password: false,
				regerror: false,
				modalcontent: '',
			};
		case BUSINESS:
			return {
				...state,
				auth_name: true,
				auth_email: false,
				auth_info: !action.payload.info,
				auth_bs: false,
				auth_password: false,
				regerror: false,
				modalcontent: '',
			};
		case INFO:
			return {
				...state,
				auth_name: true,
				auth_email: false,
				auth_info: false,
				auth_bs: false,
				auth_password: !action.payload.password,
				regerror: false,
				modalcontent: '',
			};
		case PASSWORD:
			return {
				...state,
				auth_name: !action.payload.name,
				auth_email: false,
				auth_info: false,
				auth_bs: false,
				auth_password: false,
				regerror: false,
				modalcontent: '',
			};
		case REG_ERROR:
			return {
				...state,
				regerror: !action.payload.regerror,
				modalcontent: action.payload.message,
			};

		default:
			return {
				...state,
			};
	}
};
