import { GTA, GOD_OF_WAR, FIFA, GHOST } from '../types/gametypes';
export const gamereducer = (state = {}, action) => {
	switch (action.type) {
		case FIFA:
			return {
				...state,
				fifa: !action.payload,
				goa: state.goa,
				gta: state.gta,
				ghost: state.ghost,
				head: state.head,
				standings_check: true,
			};
		case GOD_OF_WAR:
			return {
				...state,
				fifa: state.fifa,
				ghost: state.ghost,
				goa: !action.payload,
				gta: state.gta,
				head: state.head,
				standings_check: true,
			};
		case GTA:
			return {
				...state,
				fifa: state.fifa,
				goa: state.goa,
				ghost: state.ghost,
				gta: !action.payload,
				head: state.head,
				standings_check: true,
			};
		case GHOST:
			return {
				...state,
				ghost: !action.payload,
				fifa: false,
				goa: false,
				gta: state.payload,
				head: true,
				standings_check: true,
			};
		case 'UNCHATTERED':
			return {
				...state,
				fifa: false,
				goa: false,
				gta: !action.payload,
				head: true,
				standings_check: true,
			};
		case 'FORTNITE':
			return {
				...state,
				fifa: false,
				goa: false,
				gta: !action.payload,
				head: true,
				standings_check: true,
			};
		case 'CALL_OF_DUTY':
			return {
				...state,
				fifa: false,
				goa: false,
				gta: !action.payload,
				head: true,
				standings_check: true,
			};
		case 'NONE':
			return {
				...state,
				fifa: false,
				goa: false,
				gta: false,
				standings_check: true,
			};
		case 'GO_BACK':
			return {
				...state,
				fifa: false,
				goa: false,
				gta: false,
				ghost: false,
				standings_check: true,
			};
		case 'MODES':
			return {
				...state,
				modes: !action.payload,
			};

		// Get Gamers reducer

		case 'LOAD_GAMES':
			return {
				...state,
				allgames: action.payload,
			};
		case 'SETUSER':
			return {
				...state,
				currentUser: action.payload,
			};

		case 'ERROR_GAMES':
			return {
				...state,
				loading: false,
			};

		case 'ERROR':
			return {
				...state,
				date_search: false,
				search: false,
			};
		case 'Loading':
			return {
				...state,
				loading: !state.loading,
			};
		case 'STANDINGS':
			return {
				...state,
				team_standings: action.payload,
			};
		case 'FIXTURES':
			return {
				...state,
				team_fixtures: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};
