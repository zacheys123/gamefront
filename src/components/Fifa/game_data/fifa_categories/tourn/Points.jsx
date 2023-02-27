import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Points_Container } from '../../../../../css/modes/tournament.js';
import { Button } from '@mui/material';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import shortid from 'shortid';
import Add from '@mui/icons-material/Add';
import GameDisplay from './GameDisplay.jsx';
import Refresh from '@mui/icons-material/Refresh';
const Points = () => {
	const baseUrl = 'http://localhost:3500';
	const [players, setNames] = useState();
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
	const [tournament, setTournament] = useState([]);
	const [tournament2, setTournament2] = useState([]);
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
	return (
		<Points_Container>
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
											<Button
												onClick={handleSubmit}
												variant="contained"
											>
												Save Data
											</Button>
										</div>
										<div className="row">
											{' '}
											<Button
												variant="contained"
												sx={{ background: 'orange' }}
												onClick={() => {
													setNewMatch((prev) => !prev);
													setMatch((prev) => !prev);
												}}
											>
												Add Another Match <Add />
											</Button>
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
											<option value="Semi_Finals">Semi Finals</option>

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
									<Button onClick={handleSubmit2} variant="contained">
										Save Data
									</Button>
								</div>
							</Form>
						</div>
					</motion.div>
				)}
			</div>
			<div className="right__body">
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
									{parseFloat(ndata?.noplayers * ndata?.amount)} ksh
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
							sx={{ color: 'black !important', fontSize: '1rem' }}
						/>
					</div>
				</div>
				<GameDisplay record={record} />
			</div>
		</Points_Container>
	);
};

export default Points;
