import {
	FIFA,
	GHOST,
	GODWAR,
	GRAND,
	LAST,
	MOST,
	COD,
	FORT,
	MORTAL,
	UNCHARTERED,
} from '../types/videos_type';
export const videos_state = {
	fifa_state: false,
	ghost_state: false,
	god_state: false,
	grand_state: false,
	last_state: false,
	most_state: false,
	mortal_state: false,
	unchartered_state: false,
	cod_state: false,
	fortstate: false,
	current_vids: [],
};

export const videos_reducer = (state = videos_state, action) => {
	switch (action.type) {
		case 'STORE':
			return {
				...state,
				current_vids: action.payload,
			};
		case FIFA:
			return {
				...state,
				fifa_state: true,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case GHOST:
			return {
				...state,
				fifa_state: false,
				ghost_state: true,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case GODWAR:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: true,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case GRAND:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: true,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case LAST:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: true,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case MOST:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: true,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case COD:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: true,
				fort_state: false,
				mortal_state: false,
				unchartered_state: false,
			};
		case FORT:
			return {
				...state,
				fifa_state: true,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: true,
				mortal_state: false,
				unchartered_state: false,
			};
		case MORTAL:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: true,
				unchartered_state: false,
			};
		case UNCHARTERED:
			return {
				...state,
				fifa_state: false,
				ghost_state: false,
				grand_state: false,
				god_state: false,
				last_state: false,
				most_state: false,
				cod_state: false,
				fort_state: false,
				mortal_state: false,
				unchartered_state: true,
			};
	}
};
