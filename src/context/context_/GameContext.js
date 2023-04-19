import React, {
	useContext,
	createContext,
	useReducer,
	useRef,
} from 'react';

import { gamereducer } from '../reducers/gamereducers';
import { mode_reducers } from '../reducers/mode_reducers';
import { GameProvider } from '../config';
import {
	tournament_reducer,
	tournament_state,
} from '../reducers/tournament_reducer';
import {
	videos_reducer,
	videos_state,
} from '../reducers/videos_reducer';

const initialState = {
	fifa: false,
	goa: false,
	gta: false,
	head: false,
	ghost: false,
	allgames: [],
	search: false,
	loading: false,
	search_input: '',
	team_standings: [],
	team_features: [],
	standings_check: false,
	currentUser: '',
};

const initial_mode = {
	player1_auth: false,
	player2_auth: false,
	player1_data: [],
	player2_data: [],
	mode_choice: true,
	allteams: false,
	loading: false,
	player1_team: '',
	player2_team: '',
	game_info: false,
	error: '',
	iserror: false,
	p_data: {},
	issuccess: false,
	modes: {},
	success: '',
	gaming: false,
	expand_results: false,
};

const GameContext = ({ children }) => {
	const [game, setGame] = useReducer(gamereducer, initialState);
	const [tournament, setTournament] = useReducer(
		tournament_reducer,
		tournament_state,
	);
	const [videos, setVideos] = useReducer(
		videos_reducer,
		videos_state,
	);

	const [modes_state, setMode] = useReducer(
		mode_reducers,
		initial_mode,
	);
	let value = {
		game,
		setGame,
		setMode,
		modes_state,
		tournament,
		setTournament,
		videos_reducer,
		videos_state,
		setVideos,
		videos,
	};
	return (
		<GameProvider.Provider value={value}>
			{children}
		</GameProvider.Provider>
	);
};

export default GameContext;

export const useGameContext = () => {
	const context = useContext(GameProvider);
	if (!context) {
		throw new Error('useGameContext can only be used in children');
	}
	return context;
};
