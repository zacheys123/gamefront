export const mode_reducers = (state = {}, action) => {
	switch (action.type) {
		case 'GET_PLAYER1_TEAMS':
			return {
				...state,
				player1_data: action.payload.response,
				loading: !action.payload.loading,
			};
		case 'GET_PLAYER2_TEAMS':
			return {
				...state,
				player2_data: action.payload.response,
				loading: !action.payload.loading,
			};
		case 'FINALLY':
			return {
				...state,

				loading: false,
			};

		case 'NONE':
			return {
				...state,
				mode_choice: false,
			};
		case 'NONE_':
			return {
				...state,
				mode_choice: true,
				allteams: false,
			};
		case 'BACK':
			return {
				...state,
				allteams: false,
			};
		case 'TEAMS':
			return {
				...state,
				allteams: !action.payload,
			};
		case 'PLAYER1':
			return {
				...state,
				player1_team: action.payload,
			};
		case 'PLAYER2':
			return {
				...state,
				player2_team: action.payload,
			};
		case 'PLAYER1_AUTH':
			return {
				...state,
				player1_auth: true,
				player2_auth: false,
			};
		case 'PLAYER2_AUTH':
			return {
				...state,
				player1_auth: false,
				player2_auth: true,
			};
		case 'GAME_ERROR':
			return {
				...state,
				iserror: !state.iserror,
				success: false,
				loading: false,
				error: action.error,
			};
		case 'GAME_ERROR_COMPLETE':
			return {
				...state,
				iserror: !state.iserror,
				success: false,
				loading: false,
				error: action.error,
			};
		case 'CANCEL_GINFO':
			return {
				...state,
				game_info: false,
			};
		case 'POST':
			return {
				...state,
				loading: false,
				issuccess: true,
				iserror: false,
				success: action.payload.success,
			};
		case 'POST_ERROR':
			return {
				...state,
				loading: true,
			};
		case 'POST_COMPLETE':
			return {
				...state,
				loading: false,
				success: action.payload.success,
			};
		case 'EMPTY':
			return {
				...state,
				error: action.payload,
				iserror: !state.iserror,
			};
		case 'Numbers':
			return {
				...state,
				error: action.payload,
				iserror: !state.iserror,
			};
		case 'MOBILEGAME':
			return {
				...state,
				gaming: !action.payload.gaming,
			};
		default:
			return {
				...state,
			};
	}
};
