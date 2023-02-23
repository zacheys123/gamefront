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
	CLEANUP,
	ERROR_REG,
	ERROR_EMAIL,
	CLEANUP_UTILS,
	SECRET,
} from '../types/action_type';
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
				error_auth: true,
				success_auth: false,
			};
		case SUCCESS:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.payload.modalcontent,
				error_auth: false,
				success_auth: true,
			};
		case ERROR_REG:
			return {
				...state,
				error_reg: !state.error_reg,
				modalcontent: action.payload.modalcontent,
			};
		case ERROR_EMAIL:
			return {
				...state,
				error_email: !state.error_reg,
				regerror: false,
				message: action.payload.message,
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
				success_auth: !action.payload.success,
				admin: action.payload.admin,
				logged: !state.logged,
				error_auth: false,
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
				auth_secret: false,
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
				auth_secret: false,
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
				auth_secret: false,
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
				auth_secret: !action.payload.password,
				auth_password: false,
				regerror: false,
				modalcontent: '',
			};
		case SECRET:
			return {
				...state,
				auth_name: true,
				auth_email: false,
				auth_info: false,
				auth_bs: false,
				auth_password: !action.payload.password,
				auth_secret: false,
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
				regerror: true,
				modalcontent: action.payload.message,
			};
		case CLEANUP:
			return {
				...state,
				error_email: false,
			};
		case CLEANUP_UTILS:
			return {
				...state,
				regerror: false,
			};

		default:
			return {
				...state,
			};
	}
};
