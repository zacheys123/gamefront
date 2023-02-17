import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Points_Container } from '../../../../../css/modes/tournament.js';
import { Button } from '@mui/material';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Add from '@mui/icons-material/Add';
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

	const [player_data, setPlayers] = useState({
		p1: '',
		p2: '',
		p3: '',
		p4: '',
		type: '',
		type2: '',
		station2: '',
		station: '',
		winner: '',
		winner2: '',
	});
	const [names, setNoNames] = useState(false);
	const [newmatch, setNewMatch] = useState(false);
	const [match, setMatch] = useState(false);
	const handleNames = () => {
		if (players) {
			localStorage.setItem(
				'players',
				JSON.stringify(players.split(',')),
			);
			setNoNames((prev) => !prev);
		} else {
			setNoNames(false);
		}
	};
	const handlePlayer = (ev) => {
		setPlayers({ ...player_data, [ev.target.name]: ev.target.value });
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
	return (
		<Points_Container>
			<div className="left">
				{!names && (
					<div className="left__header">
						<div>
							{mydata?.tournament.map((userdata, idx) => {
								return <h4 key={idx}> {userdata.tourn_name}</h4>;
							})}
						</div>
						<textarea
							value={players}
							onChange={(ev) => setNames(ev.target.value)}
							name="players"
							id="players"
							cols="40"
							placeholder="Player Names (separate by comma e.g mike,john,grace etc)"
							rows="1"
						></textarea>
						<Button variant="outlined" onClick={handleNames}>
							Submit Names
						</Button>
					</div>
				)}
				{!match ? (
					<motion.div
						className="left__body"
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
											value={p1}
											onChange={handlePlayer}
											name="p1"
										>
											{allplayers.map((names, idx) => {
												return (
													<option key={idx} value={names}>
														{names}
													</option>
												);
											})}
										</Form.Select>
									</div>

									<div className="col">
										{' '}
										<Form.Select
											value={p2}
											onChange={handlePlayer}
											name="p2"
										>
											{allplayers.map((names, idx) => {
												return (
													<option key={idx} value={names}>
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
											value={type}
											onChange={handlePlayer}
											name="type"
										>
											<option value="1st ">1st Round</option>
											<option value="2nd ">2nd Round</option>
											<option value="quarter ">Quarter Finals</option>
											<option value="semi ">Semi Finals</option>
											<option value="final ">Finals</option>
										</Form.Select>
									</div>
								</div>

								<div className="row">
									{' '}
									<Form.Control
										type="text"
										placeholder="Station"
										value={station}
										onChange={handlePlayer}
										name="station"
									/>
								</div>
								<div className="row">
									{' '}
									<Form.Control
										type="text"
										placeholder="Winner"
										value={winner}
										onChange={handlePlayer}
										name="winner"
									/>
								</div>
								<div className="row">
									{' '}
									<Button variant="contained">Save Data</Button>
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
					</motion.div>
				) : (
					<motion.div
						className="left__body"
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
							<Form>
								<div className="row">
									<div className="col">
										{' '}
										<Form.Select
											value={p3}
											onChange={handlePlayer}
											name="p3"
										>
											{allplayers.map((names, idx) => {
												return (
													<option key={idx} value={names}>
														{names}
													</option>
												);
											})}
										</Form.Select>
									</div>

									<div className="col">
										{' '}
										<Form.Select
											value={p4}
											onChange={handlePlayer}
											name="p4"
										>
											{allplayers.map((names, idx) => {
												return (
													<option key={idx} value={names}>
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
											value={type2}
											onChange={handlePlayer}
											name="type2"
										>
											<option value="1st ">1st Round</option>
											<option value="2nd ">2nd Round</option>
											<option value="quarter ">Quarter Finals</option>
											<option value="semi ">Semi Finals</option>
											<option value="final ">Finals</option>
										</Form.Select>
									</div>
								</div>

								<div className="row">
									{' '}
									<Form.Control
										type="text"
										placeholder="Station"
										value={station2}
										onChange={handlePlayer}
										name="station2"
									/>
								</div>
								<div className="row">
									{' '}
									<Form.Control
										type="text"
										placeholder="Winner"
										value={winner2}
										onChange={handlePlayer}
										name="winner2"
									/>
								</div>
								<div className="row">
									{' '}
									<Button variant="contained">Save Data</Button>
								</div>
							</Form>
						</div>
					</motion.div>
				)}
			</div>
			<div className="right__body"></div>
		</Points_Container>
	);
};

export default Points;
