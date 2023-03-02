import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Points_Container } from '../../../../../css/modes/tournament.js';
import { Button, CircularProgress } from '@mui/material';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import shortid from 'shortid';
import { finalTourn } from '../../../../../context/features/tournamentSlice';
import { useGameContext } from '../../../../../context/context_/GameContext';
import Add from '@mui/icons-material/Add';
import GameDisplay from './GameDisplay.jsx';
import Refresh from '@mui/icons-material/Refresh';
import { FINERROR } from '../../../../../context/types/tournament_type.js';
const Points = () => {
	const baseUrl = 'https://gamebackend.onrender.com';
	const {
		tournament: {
			loading,
			tourn_error,
			tourn_iserror,
			tourn_success,
			tourn_issuccess,
		},
		setTournament,
	} = useGameContext();
	const [players, setNames] = useState();
	const [complete, setComplete] = useState(false);

	const [adm, setadm] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('profile'));
		if (!storedvalues) {
			return '';
		} else {
			return storedvalues?.result?._id;
		}
	});

	// getting all movies for this user
	const {
		data: mydata,
		refetch,
		isLoading,
		isError,
	} = useQuery(['allusers'], async () => {
		const response = await axios.get(`${baseUrl}/user/v2/${adm}`);

		return response?.data;
	});
	const [defaultVal, setDefaultVal] = useState('');
	const handleValue = () => {
		const defaultValue = players?.split(',')[0];
		setDefaultVal(defaultValue);
	};

	const [player_data, setPlayers] = useState({
		p1: 'player1',
		p2: 'player2',
		type: '',
		station: '',
		winner: '',
	});

	console.log();
	const [player_data2, setPlayers2] = useState({
		p3: 'player1',
		p4: 'player2',
		type2: '',
		station2: '',
		winner2: '',
	});
	const [names, setNoNames] = useState(false);
	const [logged, setLogged] = useState(false);
	const [newmatch, setNewMatch] = useState(false);
	const [match, setMatch] = useState(false);
	const handleNames = () => {
		if (players) {
			localStorage.setItem(
				'players',
				JSON.stringify(players.split(',')),
			);
			setNoNames((prev) => !prev);
			setLogged((prev) => !prev);
		} else {
			setNoNames(false);
		}
	};
	const handlePlayer = (ev) => {
		setPlayers({ ...player_data, [ev.target.name]: ev.target.value });
		setPlayers2({
			...player_data2,
			[ev.target.name]: ev.target.value,
		});
	};
	const [allplayers, setAllPlayers] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('players'));
		if (!storedvalues) {
			return [];
		} else {
			return storedvalues;
		}
	});

	const variants = {
		initial: {
			x: '100%',
			opacity: 0,
		},
		animate: {
			x: ['100%', '0%', '-5%', '0%'],
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.6,
			},
		},
	};

	const tourn1 = useRef();
	const tourn2 = useRef();
	const [record, setRecord] = useState(false);
	const [tournament] = useState([]);
	const [tournament2] = useState([]);
	const handleSubmit = useCallback((ev) => {
		ev.preventDefault();

		const newdata = { ...tourn1.current, id: shortid.generate() };
		console.log(newdata);

		window.localStorage.setItem('game', JSON.stringify(newdata));
		tournament.push(newdata);
		window.localStorage.setItem(
			'tournament1',
			JSON.stringify(tournament),
		);
		setRecord((prev) => !prev);
	}, []);
	const handleSubmit2 = useCallback((ev) => {
		ev.preventDefault();

		const newdata = { ...tourn2.current, id: shortid.generate() };

		tournament2.push(newdata);
		window.localStorage.setItem('game', JSON.stringify(newdata));
		window.localStorage.setItem(
			'tournament2',
			JSON.stringify(tournament2),
		);
		setRecord((prev) => !prev);
	}, []);
	useEffect(() => {
		tourn1.current = player_data;
		tourn2.current = player_data2;
	}, [player_data, player_data2]);
	useEffect(() => {
		const storedvalues = JSON.parse(localStorage.getItem('players'));
		if (!storedvalues) {
			setAllPlayers([]);
		} else {
			setAllPlayers(storedvalues);
		}
	}, [logged]);
	const ndata = mydata?.tournament[mydata?.tournament.length - 1];
	const [games, setGames] = useState([]);
	const [games2, setGames2] = useState([]);
	useEffect(() => {
		const storedvalues = JSON.parse(
			localStorage.getItem('tournament1'),
		);
		if (!storedvalues) {
			setGames([]);
		}

		setGames(storedvalues);
	}, [record]);
	useEffect(() => {
		const storedvalues2 = JSON.parse(
			localStorage.getItem('tournament2'),
		);
		if (!storedvalues2) {
			setGames2([]);
		}
		setGames2(storedvalues2);
	}, [record]);
	const completeref = useRef();
	const [complete_tournament, setCompleteTournament] = useState({
		first_runner: '',
		second_runner: '',
		prize: '',
		winner: '',
	});
	const handleComplete = (ev) => {
		setCompleteTournament({
			...complete_tournament,
			[ev.target.name]: ev.target.value,
		});
	};
	useEffect(() => {
		completeref.current = complete_tournament;
	}, []);
	const onSubmit = useCallback((ev) => {
		ev.preventDefault();

		finalTourn(setTournament, completeref, adm);
	}, []);
	return (
		<Points_Container>
			{tourn_issuccess ? (
				<div
					style={{
						width: '80vw',
						margin: '0 auto',
						height: '70vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div>{tourn_success}</div>
				</div>
			) : (
				<>
					<div className="lefts">
						<div className="left__headers">
							<div>
								<h4> {mydata?.tourn}</h4>;
							</div>
							{!JSON.parse(localStorage.getItem('players')) && (
								<>
									<textarea
										value={player_data.players}
										onChange={(ev) => setNames(ev.target.value)}
										name="players"
										id="players"
										cols="40"
										placeholder="Player Names (separate by comma e.g mike,john,grace etc)"
										rows="1"
										onKeyDown={handleValue}
									></textarea>
									<Button variant="outlined" onClick={handleNames}>
										Submit Names
									</Button>
								</>
							)}
						</div>

						{!match ? (
							<motion.div
								className="left__bodys"
								variant={variants}
								initial="intial"
								animate="animate"
							>
								{newmatch && (
									<div className="">
										<span
											onClick={() => {
												setMatch((prev) => !prev);
											}}
											className="text-light back_icon "
										>
											<KeyboardBackspaceIcon />
										</span>
									</div>
								)}
								{JSON.parse(localStorage.getItem('players')) && (
									<>
										<div className="row data">
											<h5
												style={{
													color: 'orange',
													textDecoration: 'underline',
													textAlign: 'center',
												}}
											>
												Station 1
											</h5>
											<Form>
												<div className="row">
													<div className="col">
														{' '}
														<Form.Select
															value={player_data.p1}
															onChange={handlePlayer}
															name="p1"
														>
															{allplayers.map((names, idx) => {
																return (
																	<option
																		key={idx}
																		value={player_data.names}
																	>
																		{names}
																	</option>
																);
															})}
														</Form.Select>
													</div>

													<div className="col">
														{' '}
														<Form.Select
															value={player_data.p2}
															onChange={handlePlayer}
															name="p2"
														>
															{allplayers.map((names, idx) => {
																return (
																	<option
																		key={idx}
																		value={player_data.names}
																	>
																		{names}
																	</option>
																);
															})}
														</Form.Select>
													</div>
												</div>
												<div className="row">
													{' '}
													<div className="col">
														{' '}
														<Form.Select
															value={player_data.type}
															onChange={handlePlayer}
															name="type"
														>
															<option>
																Choose Competition Stage
															</option>
															<option value="1st_Round">
																1st Round
															</option>
															<option value="2nd_Round">
																2nd Round
															</option>
															<option value="Quarter_Finals(1)">
																Quarter Finals(1)
															</option>
															<option value="Quarter_Finals(2)">
																Quarter Finals(2)
															</option>
															<option value="Semi_Finals">
																Semi Finals
															</option>

															<option value="Finals">Finals</option>
														</Form.Select>
													</div>
												</div>

												<div className="row">
													{' '}
													<Form.Control
														type="text"
														placeholder="Station"
														value={player_data.station}
														onChange={handlePlayer}
														name="station"
													/>
												</div>
												<div className="row">
													{' '}
													<Form.Control
														type="text"
														placeholder="Winner"
														value={player_data.winner}
														onChange={handlePlayer}
														name="winner"
													/>
												</div>
												<div className="row">
													{' '}
													<button
														onClick={handleSubmit}
														variant="contained"
														className="btn btn-danger text-light"
													>
														Save Match
													</button>
												</div>
												<div className="row">
													{' '}
													<button
														variant="contained"
														sx={{ background: 'orange' }}
														onClick={() => {
															setNewMatch((prev) => !prev);
															setMatch((prev) => !prev);
														}}
														className="btn btn-success text-light"
													>
														Add Another Match <Add />
													</button>
												</div>
											</Form>
										</div>
									</>
								)}
							</motion.div>
						) : (
							<motion.div
								className="left__bodys"
								variant={variants}
								initial="intial"
								animate="animate"
							>
								{newmatch && (
									<div className="">
										<span
											onClick={() => {
												setMatch((prev) => !prev);
												setNewMatch((prev) => !prev);
											}}
											className="text-light back_icon "
										>
											<KeyboardBackspaceIcon />
										</span>
									</div>
								)}
								<div className="row data">
									<h5
										style={{
											color: 'orange',
											textDecoration: 'underline',
											textAlign: 'center',
										}}
									>
										Station 2
									</h5>
									<Form onSubmit={handleSubmit2}>
										<div className="row">
											<div className="col">
												{' '}
												<Form.Select
													value={player_data2.p3}
													onChange={handlePlayer}
													name="p3"
												>
													{allplayers.map((names, idx) => {
														return (
															<option
																key={idx}
																value={player_data2.names}
															>
																{names}
															</option>
														);
													})}
												</Form.Select>
											</div>

											<div className="col">
												{' '}
												<Form.Select
													value={player_data2.p4}
													onChange={handlePlayer}
													name="p4"
												>
													{allplayers.map((names, idx) => {
														return (
															<option
																key={idx}
																value={player_data2.names}
															>
																{names}
															</option>
														);
													})}
												</Form.Select>
											</div>
										</div>
										<div className="row">
											{' '}
											<div className="col">
												{' '}
												<Form.Select
													value={player_data2.type2}
													onChange={handlePlayer}
													name="type2"
												>
													<option>Choose Competition Stage</option>
													<option value="1st_Round">1st Round</option>
													<option value="2nd_Round">2nd Round</option>
													<option value="Quarter_Finals(1)">
														Quarter Finals(1)
													</option>
													<option value="Quarter_Finals(2)">
														Quarter Finals(2)
													</option>
													<option value="Semi_Finals">
														Semi Finals
													</option>

													<option value="Finals">Finals</option>
												</Form.Select>
											</div>
										</div>

										<div className="row">
											{' '}
											<Form.Control
												type="text"
												placeholder="Station"
												value={player_data2.station2}
												onChange={handlePlayer}
												name="station2"
											/>
										</div>
										<div className="row">
											{' '}
											<Form.Control
												type="text"
												placeholder="Winner"
												value={player_data2.winner2}
												onChange={handlePlayer}
												name="winner2"
											/>
										</div>
										<div className="row">
											{' '}
											<button
												onClick={handleSubmit2}
												variant="contained"
												className="btn btn-danger text-light"
											>
												Save Data
											</button>
										</div>
									</Form>
								</div>
							</motion.div>
						)}
					</div>
					{!complete ? (
						<div className="right__body d-flex flex-column mb-3">
							<>
								<div className="d-flex my-3 align-items-center">
									<div
										className="d-flex align-items-center justify-content-evenly"
										style={{
											flex: 1,
										}}
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-evenly',
												alignItems: 'center',
											}}
										>
											<>
												{' '}
												<span style={{ color: 'red' }}>
													Host:
													<span
														style={{
															color: 'green',
															fontWeight: 'bold',
															fontSize: '1 rem',
															marginRight: '.7rem',
														}}
													>
														{' '}
														{ndata?.facilitator}
													</span>
												</span>
											</>
											<>
												<span
													style={{
														background: 'darkgreen',
														color: 'white',
														fontWeigh: 'bold',
														fontSize: '1rem',
														padding: '.6rem',
														borderRadius: '10px',
													}}
												>
													Cash Prize:
													{parseFloat(
														ndata?.noplayers * ndata?.amount,
													)}{' '}
													ksh
												</span>
											</>
										</div>
									</div>
									<div
										onClick={() => setRecord((prev) => !prev)}
										className="mx-4"
									>
										<span>Refresh</span>{' '}
										<Refresh
											sx={{
												color: 'black !important',
												fontSize: '1rem',
											}}
										/>
									</div>
								</div>

								<GameDisplay
									record={record}
									complete={complete}
									setComplete={setComplete}
									tourn1={tourn1}
								/>
							</>
						</div>
					) : (
						<div className=" bg-black" style={{ flex: 5 }}>
							<Form onSubmit={onSubmit}>
								<div className=" my-2">
									<div className="col my-5">
										{' '}
										<input
											type="text"
											className="form-control"
											placeholder="1st RunnerUP"
											name="first_runner"
											value={complete_tournament?.first_runner}
											onChange={handleComplete}
										/>
									</div>
									<div className="col my-5">
										{' '}
										<input
											type="text"
											className="form-control"
											placeholder="2nd RunnerUP"
											name="second_runner"
											value={complete_tournament?.second_runner}
											onChange={handleComplete}
										/>
									</div>

									<div className="col my-5">
										{' '}
										<input
											type="text"
											className="form-control"
											name="prize"
											placeholder="Cash Prize"
											value={complete_tournament.prize}
											onChange={handleComplete}
										/>
									</div>
									<div>
										{' '}
										<input
											type="text"
											className="form-control my-4"
											placeholder="Winner"
											name="winner"
											value={complete_tournament?.winner}
											onChange={handleComplete}
										/>
									</div>
									<div className="row my-3">
										{tourn_iserror && (
											<span className="text-danger">
												{tourn_error}
											</span>
										)}
									</div>
								</div>
								<button
									className="btn btn-success text-light"
									type="submit"
								>
									{loading ? (
										<div className="d-flex align-items-center">
											<CircularProgress
												size="27px"
												sx={{ color: 'white' }}
											/>{' '}
											<span className="mx-2">Record</span>
										</div>
									) : (
										'Record'
									)}
								</button>
							</Form>
						</div>
					)}
				</>
			)}
		</Points_Container>
	);
};

export default Points;
