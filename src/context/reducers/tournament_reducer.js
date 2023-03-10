import {
	TOURNAMENT,
	TOURNAMENT_ERROR,
	LOADING,
	POINTS,
	ELIMINATION,
	ERROR_COMPLETE,
	TOURNAMENT_COMPLETE,
	TOURN_POINTS,
	TOURN_ELIMINATION,
	TOURN,
	SHOWFORM,
	FINALERROR,
	FINALERROR_COMPLETE,
	FINAL,
	FINAL_COMPLETE,
} from '../types/tournament_type';
export const tournament_state = {
	iserror: false,
	error: '',
	success: '',
	issuccess: false,
	tourn_iserror: false,
	tourn_error: '',
	tourn_success: '',
	tourn_issuccess: false,
	start: false,
	points: false,
	elimination: false,
	loading: false,
	istourn_name: true,
	showform: false,
};
export const tournament_reducer = (state = {}, action) => {
	switch (action.type) {
		case TOURNAMENT:
			return {
				...state,
				isuccess: true,
				iserror: false,
				success: action.success,
				error: '',
				istourn_name: true,
			};
		case TOURNAMENT_ERROR:
			return {
				...state,
				isuccess: false,
				iserror: true,
				error: action.error,
				success: '',
				loading: true,
			};
		case ERROR_COMPLETE:
			return {
				...state,
				isuccess: false,
				iserror: false,
				error: '',
				success: '',
			};
		case TOURNAMENT_COMPLETE:
			return {
				...state,
				isuccess: false,
				iserror: false,
				error: '',
				success: '',
			};

		case LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case POINTS:
			return {
				...state,
				points: !state.points,
				elimination: true,
				start: true,
			};
		case TOURN_ELIMINATION:
			return {
				...state,
				points: false,
				elimination: false,
				start: false,
			};
		case TOURN_POINTS:
			return {
				...state,
				points: true,
				elimination: false,
				start: true,
				showform: true,
			};
		case TOURN:
			return {
				...state,

				elimination: false,
				start: false,
			};
		case SHOWFORM:
			return {
				...state,
				showform: true,
			};

		case FINAL_COMPLETE:
			return {
				...state,
				points: false,
				elimination: false,
				start: !state.showform,
				showform: !state.showform,
				tourn_issuccess: false,
				tourn_success: '',
			};
		case FINAL:
			return {
				...state,
				tourn_iserror: false,
				tourn_error: '',
				tourn_issuccess: true,
				tourn_success: action.success,
			};
		case FINALERROR_COMPLETE:
			return {
				...state,
				tourn_iserror: false,
				tourn_error: '',
				tourn_issuccess: false,
				tourn_success: '',
			};
		case FINALERROR:
			return {
				...state,
				tourn_iserror: true,
				tourn_error: action.error,
				tourn_issuccess: false,
				tourn_success: '',
			};
	}
};
