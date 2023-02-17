import {
	TOURNAMENT,
	TOURNAMENT_ERROR,
	LOADING,
	POINTS,
	ELIMINATION,
	ERROR_COMPLETE,
	TOURNAMENT_COMPLETE,
} from '../types/tournament_type';
export const tournament_state = {
	iserror: false,
	error: '',
	success: '',
	issuccess: false,
	start: false,
	points: false,
	elimination: false,
	loading: false,
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
				elimination: false,
				start: true,
			};
		case ELIMINATION:
			return {
				...state,
				points: false,
				elimination: !state.elimination,
				start: true,
			};
	}
};
