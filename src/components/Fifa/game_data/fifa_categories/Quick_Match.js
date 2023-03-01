import React, { useState, useEffect, useCallback } from 'react';

import { Stack, Box, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import shortid from 'shortid';
import { useGameContext } from '../../../../context/context_/GameContext';
import gods from '../../../../assets/gods.jpg';
import gtaimg from '../../../../assets/gta5.jpg';
import pacific from '../../../../assets/pac.jpg';
import tombraid from '../../../../assets/tomb.jpg';
import nathan from '../../../../assets/nathan.jpg';
import resident from '../../../../assets/resident.jpg';
import spiderref from '../../../../assets/spider.jpg';
import unchart4 from '../../../../assets/unchartered4.jpg';
import lastimg from '../../../../assets/last.jpg';
//
import nba from '../../../../assets/nba.jpg';

import SideView from './SideView';
import { Navigate, useNavigate } from 'react-router-dom';
import Score from './Score';
const Quick_Match = (props) => {
	const {
		game: { fifa },
		modes_state: { game_info, gaming, expand_results },
		setMode,
	} = useGameContext();

	const [loader, setLoading] = useState(false);
	const [temp_data, setTemp] = useState(
		JSON.parse(localStorage.getItem('rec_games')),
	);
	const navigate = useNavigate();
	const [rec_match, setRec_match] = useState(() => {
		const storedvalues = localStorage.getItem('rec_games');
		if (!storedvalues) return [];
		return JSON.parse(storedvalues);
	});
	const [error, setError] = useState('');

	const [player_data, setPlayerData] = useState({
		player1: '',
		player2: '',
		player1_team: '',
		player2_team: '',
		telno1: 'null',
		telno2: 'null',
		station: 1,
	});

	const game_data = {
		...player_data,
		_id: shortid.generate(),
	};

	const startmatch = async (ev) => {
		ev.preventDefault();

		if (
			player_data.player1_team &&
			player_data.player2_team &&
			player_data?.player1 &&
			player_data?.player2
		) {
			setTimeout(() => {
				setMode({
					type: 'GAME_INFO',
					payload: {
						game_data: JSON.parse(
							window.localStorage.getItem('game'),
						),
					},
				});
				rec_match.push(game_data);
				window.localStorage.setItem(
					'games',
					JSON.stringify(game_data),
				);
				window.localStorage.setItem(
					'rec_games',
					JSON.stringify(rec_match),
				);
				setTemp(rec_match);
				setMode({
					type: 'MOBILEGAME',
					payload: {
						gaming,
					},
				});
				setLoading(false);
				navigate('#top');
			}, 2000);

			setLoading(true);
			// window.localStorage.removeItem('games');
		} else {
			alert('Cannot submit Empty Inputs,tel no is optional');
		}
	};
	useEffect(() => {
		window.localStorage.setItem(
			'rec_games',
			JSON.stringify(rec_match),
		);
	}, [fifa]);

	const handleChange = (ev) => {
		setPlayerData((playerdata) => ({
			...playerdata,
			[ev.target.name]: ev.target.value,
		}));
	};

	const values = { rec_match, game_data, setTemp };

	return (
		<>
			<Stack
				id="top"
				direction="row"
				sx={{ background: 'black', minHeight: '65vh !important' }}
				className="modequick"
			>
				<Box
					style={{
						flex: '1.4',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
					}}
					className="relate__parent"
				>
					{' '}
					<h5 style={{ color: 'white', flex: '.4' }}>Other Games</h5>
					<Box
						sx={{
							flex: '9',
							position: 'relative',
							overflowY: 'scroll',
						}}
					>
						<div className="related">
							<img src={gods} alt="" />
							<img src={gtaimg} alt="" />
							<img src={tombraid} alt="" />
							<img src={pacific} alt="" />
							<img src={unchart4} alt="" />
							<img src={spiderref} alt="" />
							<img src={nathan} alt="" />
							<img src={lastimg} alt="" />
							<img src={resident} alt="" />
							<img src={nba} alt="" />
						</div>
					</Box>
				</Box>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
					}}
					className="modeRight__quickmatch"
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							background: 'hsl(20,60%,80% )',
							height: '65vh',
						}}
					>
						<Stack
							direction="row"
							sx={{ width: '100%' }}
							justifyContent="center"
						>
							<Box className="player1">
								<h3
									align="center"
									style={{ color: 'red', marginTop: '.9rem' }}
								>
									{player_data?.player1.length < 0
										? 'Player1'
										: `Player1(${player_data?.player1})`}
								</h3>

								<Box className="player__control1">
									<input
										name="player1_team"
										placeholder="Enter Team *"
										style={{ color: 'red', width: '100%' }}
										value={player_data?.player1_team}
										onChange={handleChange}
									/>
								</Box>
								<Box className="player__name">
									<input
										style={{ color: 'green', width: '100%' }}
										name="player1"
										value={player_data?.player1}
										placeholder="Enter Player Name"
										required
										onChange={handleChange}
									/>
								</Box>
								<Box className="player__name">
									<input
										name="telno1"
										style={{ color: 'green', width: '100%' }}
										value={player_data?.telno1}
										placeholder="Enter Tel No(optional)"
										onChange={handleChange}
									/>
								</Box>
							</Box>

							<Box className="player2">
								{' '}
								<h3
									align="center"
									style={{ color: 'blue', marginTop: '.9rem' }}
								>
									{player_data?.player2.length < 0
										? 'Player2'
										: `Player2(${player_data?.player2})`}
								</h3>
								<Box className="player__control1">
									<input
										name="player2_team"
										placeholder="Enter Team *"
										style={{ color: 'red', width: '100%' }}
										value={player_data?.player2_team}
										onChange={handleChange}
									/>
								</Box>
								<Box className="player__name">
									<input
										style={{ color: 'green', width: '100%' }}
										name="player2"
										value={player_data?.player2}
										placeholder="Enter Player Name"
										required
										onChange={handleChange}
									/>
								</Box>
								<Box className="player__name">
									<input
										style={{ color: 'green', width: '100%' }}
										name="telno2"
										value={player_data?.telno2}
										placeholder="Enter Tel No(optional)"
										onChange={handleChange}
									/>
								</Box>
							</Box>
						</Stack>
						<Box className="player__control1">
							<label
								htmlFor=""
								style={{ color: 'blue', marginRight: '.4rem' }}
							>
								Station No:
							</label>
							<input
								style={{
									width: '20%',
									colr: 'indigo',
								}}
								name="station"
								value={player_data?.station}
								placeholder="Enter station category(e.g No 4){optional}"
								onChange={handleChange}
							/>
						</Box>
						<Stack
							style={{
								margin: '2rem 0 2rem 0',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{!game_info && (
								<>
									<Button
										onClick={startmatch}
										variant="outlined"
										sx={{
											width: '40% !important',
											// padding: '.6rem 1.7rem .6rem 1.7rem',
											marginTop: '-1.9rem',
											color: 'yellow',
											color: 'secondary',
											// fontWeight: 'bold',
											fontFamily: 'helveticaa',
										}}
									>
										{loader ? (
											<CircularProgress
												size="27px"
												sx={{ color: 'secondary', width: '10%' }}
											/>
										) : (
											<h6>Start Match</h6>
										)}
									</Button>
								</>
							)}
						</Stack>
					</div>
				</Box>

				<Box className="preview">
					<h4
						style={{
							textDecoration: 'underline',
							color: 'lightgrey',
						}}
						align="center"
					>
						Game Preview
					</h4>
					{temp_data &&
						temp_data?.map((mygames, index) => {
							return (
								<SideView
									key={mygames._id}
									mygames={mygames}
									game_data={game_data}
									i={index}
									temp_data={temp_data}
									rec_match={rec_match}
								/>
							);
						})}
				</Box>
			</Stack>
		</>
	);
};

export default Quick_Match;
