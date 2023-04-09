import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import { useGameContext } from '../../../../context/context_/GameContext';
import { Form, Card } from 'react-bootstrap';
import { Game_Reg } from '../../../../context/features/gameSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
const SideView = ({
	mygames,
	i,
	game_data,
	rec_match,
	temp_data,
}) => {
	const {
		modes_state: {
			game_info,
			loading,
			error,
			iserror,
			success,
			issuccess,
			expand_results,
		},
		setMode,
	} = useGameContext();
	const {
		_id,
		player1,
		player2,
		player1_team,
		player2_team,
		station,
	} = mygames;

	const [extra_data, setExtraData] = useState({
		p1goals: '',
		p2goals: '',
		amount: '',
		paid: '',
		outcome: '',
		penalty_amount: '',
		best_amount: '',
	});
	const game_dataref = useRef();
	const gamin_info = useRef();
	const [gameinfo, setGameInfo] = useState('(ft)');
	const setGame = useCallback(
		(ev) => {
			ev.preventDefault();

			let newdata = {
				...mygames,
				extra_data,
			};
			console.log(newdata);
			const currUser = JSON.parse(
				window.localStorage.getItem('profile'),
			);

			Game_Reg(
				newdata,
				setMode,
				loading,
				currUser?.result?._id,
				issuccess,
				setExtraData,
				gamin_info,
			);
			window.localStorage.removeItem('rec_games');
		},
		[extra_data, mygames],
	);

	const handleExtra = (ev) => {
		setExtraData((extra_data) => {
			return { ...extra_data, [ev.target.name]: ev.target.value };
		});
	};

	// remove functionality
	const remove = (index) => {
		if (rec_match.length === 1 && rec_match.length < 1) {
			window.localStorage.removeItem('games');
			window.localStorage.setItem(
				'rec_games',
				JSON.stringify(game_data),
			);
		}
		rec_match.splice(index, 1);
		// const newgames = rec_match.filter((game, idx) => {
		// 	return idx !== index;
		// });
		// return newgames;
	};
	const [mybutton, setButton] = useState(true);

	useEffect(() => {
		game_dataref.current = extra_data;
		gamin_info.current = gameinfo;
	}, []);
	useEffect(() => {
		gamin_info.current = gameinfo;
	}, [gameinfo]);
	const [penalty, setPenalty] = useState(false);
	const [best, setBest] = useState(false);
	const [draw, setDraw] = useState(false);
	const [main, setMain] = useState(false);

	const handleDraw = () => {
		if (extra_data?.p1goals === extra_data.p2goals) {
			setDraw((prev) => !prev);
			setPenalty(true);
			setMain(false);
		} else if (extra_data?.p1goals !== extra_data.p2goals) {
			setDraw(true);
			setMain(true);
		} else if (
			extra_data?.p1goals.length < 1 &&
			extra_data.p2goals.length < 1
		) {
			return false;
		} else {
			return false;
		}
	};
	useEffect(() => {
		if (
			extra_data?.p1goals?.length === 0 &&
			extra_data?.p2goals?.length === 0
		) {
			setDraw(true);
		}
	}, [extra_data?.p1goals, extra_data?.p2goals, draw]);

	useEffect(() => {
		if (
			extra_data?.p1goals > extra_data?.p2goals &&
			extra_data?.p2goals.length > 0
		) {
			setExtraData({
				outcome: player1,
			});
		} else if (extra_data?.p2goals > extra_data?.p1goals) {
			setExtraData({
				outcome: player2,
			});
		} else if (extra_data?.p2goals === extra_data?.p1goals) {
			setExtraData({
				outcome: '',
			});
		} else {
			setDraw(true);
			setMain(true);
		}
	}, [extra_data?.p1goals, extra_data?.p2goals]);
	return (
		<div className="game-container">
			<Box className="d-flex justify-content-between align-items-center ">
				<h5 className="text-light">{i}</h5>
				<strong
					style={{
						color: 'red',
						right: '4rem',
						fontSize: '2rem',
					}}
					onClick={() => remove(i)}
				>
					&times;
				</strong>
			</Box>

			<Form
				autoComplete="off"
				onSubmit={setGame}
				style={{
					marginTop: '-3.3rem',
				}}
			>
				<div className="d-flex">
					<Box>
						{' '}
						<h6 style={{ color: 'red' }}>{player1?.toUpperCase()}</h6>
					</Box>
					<Box>
						{' '}
						<h6 style={{ color: 'red' }}>{player2?.toUpperCase()}</h6>
					</Box>
				</div>

				<div className="d-flex" style={{ marginTop: '-1.5rem ' }}>
					{' '}
					<Box>
						<Form.Control
							type="text"
							disabled
							className="player1"
							name="player1_team"
							value={player1_team}
							placeholder="Team one"
						/>
					</Box>
					<Box>
						<Form.Control
							type="text"
							disabled
							className="player1"
							name="player2_team"
							value={player2_team}
							placeholder="Team one"
						/>
					</Box>
				</div>
				<div className="d-flex" style={{ marginTop: '-1.5rem ' }}>
					{' '}
					<Box>
						<Form.Control
							type="text"
							style={{
								color: 'black',
								width: '95%',
							}}
							placeholder="p1 score"
							id="p1goals"
							name="p1goals"
							value={extra_data.p1goals}
							onChange={handleExtra}
							onKeyUp={handleDraw}
						/>
					</Box>
					<Box>
						<Form.Control
							type="text"
							style={{
								color: 'black',
								width: '95%',
							}}
							placeholder="p2 score"
							id="p2goals"
							name="p2goals"
							value={extra_data.p2goals}
							onChange={handleExtra}
							onKeyUp={handleDraw}
						/>
					</Box>
				</div>
				{!draw ? (
					<div className="best">
						{penalty && (
							<div className="best__top">
								<h5
									style={{
										color: 'white',
										fontSize: '.8rem',
										border: '1px solid lightgrey',
										padding: '.3rem',
										marginTop: '.3rem',
									}}
									className="d-flex justify-content-between align-items-center"
									onClick={() => setBest((best) => !best)}
								>
									Best of two
									{!best ? (
										<ArrowDropDownIcon
											onClick={() => setBest((best) => !best)}
										/>
									) : (
										<ArrowDropUpIcon
											onClick={() => setBest((best) => !best)}
										/>
									)}
								</h5>
							</div>
						)}
						{best && (
							<>
								<div className="d-flex flex-row justify-content-between ">
									{' '}
									<span
										style={{
											color: 'greenyellow',
											fontWeight: 'bold',
										}}
									>
										{' '}
										game 1:
									</span>{' '}
									<span style={{ color: 'red' }}>draw</span>
								</div>

								<div
									className="my-1 px-2 "
									style={{ marginTop: '-1rem' }}
								>
									<div className="d-flex">
										<label
											style={{ color: 'white' }}
											htmlFor="amount"
										>
											Amout owed:
											<Form.Control
												type="text"
												name="best_amount"
												id="amount"
												onChange={handleExtra}
												value={extra_data?.best_amount}
											/>
										</label>
									</div>
									<div>
										{' '}
										<Form.Control
											type="text"
											name="outcome"
											onChange={handleExtra}
											value={extra_data?.outcome}
											className="outcome"
											placeholder="Match Winner"
										/>
									</div>
								</div>

								<div
									className="best_bottom"
									style={{ marginTop: '2.5rem' }}
								>
									<Button
										onClick={() => {
											setGameInfo('(bst)');

											setTimeout(() => {
												remove(i);
											}, 19000);
										}}
										type="submit"
										variant="outlined"
										className="px-2 mb-2 mx-lg-1 fs-7 text-success"
									>
										{loading ? (
											<CircularProgress
												size="27px"
												sx={{ color: 'warning', width: '10%' }}
											/>
										) : (
											<> Save Match</>
										)}
									</Button>
								</div>
							</>
						)}
						{!best && (
							<div className="">
								<div>
									{' '}
									<h5
										style={{
											color: 'white',
											fontSize: '.8rem',
											border: '1px solid lightgrey',
											padding: '.3rem',
											marginTop: '.3rem',
											width: '100% !important',
										}}
										className="d-flex justify-content-between align-items-center"
										onClick={() => setPenalty((penalty) => !penalty)}
									>
										Penalties
										{penalty ? (
											<ArrowDropDownIcon
												onClick={() =>
													setPenalty((penalty) => !penalty)
												}
											/>
										) : (
											<ArrowDropUpIcon
												onClick={() =>
													setPenalty((penalty) => !penalty)
												}
											/>
										)}
									</h5>
								</div>
								{!penalty && (
									<div className="d-flex flex-column">
										<div
											className="my-1 px-2 "
											style={{ margin: '2rem' }}
										></div>
										<div
											className="best_bottom"
											style={{ marginTop: '1rem' }}
										>
											<div>
												{' '}
												<Form.Control
													type="text"
													name="outcome"
													onChange={handleExtra}
													value={extra_data?.outcome}
													className="outcome"
													placeholder="Match Winner"
												/>
												<label
													style={{ color: 'white' }}
													htmlFor="amount"
												>
													Amt per game:
													<Form.Control
														type="text"
														name="penalty_amount"
														id="amount"
														onChange={handleExtra}
														value={extra_data?.penalty_amount}
													/>
												</label>
											</div>
											<Button
												onClick={() => {
													setGameInfo('(p)');
													setTimeout(() => {
														remove(i);
													}, 19000);
												}}
												type="submit"
												variant="outlined"
												className="px-2 mb-2 mx-lg-1 fs-7 text-success"
												style={{ marginTop: '3rem' }}
											>
												{loading ? (
													<CircularProgress
														size="27px"
														sx={{ color: 'warning', width: '10%' }}
													/>
												) : (
													<> Save Match</>
												)}
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
						{iserror && (
							<Box
								sx={{
									textAlign: 'center',
									color: 'red !important',
									fontWeight: '200',
								}}
							>
								{error}
							</Box>
						)}
						{issuccess && (
							<Box
								sx={{
									textAlign: 'center',
									color: 'lightblue',
									fontWeight: 'bold',
								}}
							>
								{success}
							</Box>
						)}
					</div>
				) : (
					<>
						<Box>
							<Box className="amount">
								<label style={{ color: 'white' }} htmlFor="amount">
									Amount:
									<Form.Control
										type="text"
										name="amount"
										id="amount"
										onChange={handleExtra}
										value={extra_data?.amount}
									/>
								</label>
								<label style={{ color: 'white' }} htmlFor="paid">
									AmPaid:
									<Form.Control
										id="paid"
										type="text"
										name="paid"
										onChange={handleExtra}
										value={extra_data?.paid}
									/>
								</label>
							</Box>{' '}
							<Box
								sx={{
									margin: '.7rem auto .7rem auto',
								}}
							>
								{' '}
								<label htmlFor="station" style={{ color: 'red' }}>
									Station No:
									<Form.Control
										style={{ color: 'black', width: '50%' }}
										type="text"
										value={station}
										disabled
									/>
								</label>{' '}
							</Box>
						</Box>
						{!iserror && (
							<Box
								sx={{
									textAlign: 'center',
									color: 'red',
									fontWeight: '200',
								}}
							>
								{error}
							</Box>
						)}
						{issuccess && (
							<Box
								sx={{
									textAlign: 'center',
									color: 'lightblue',
									fontWeight: 'bold',
								}}
							>
								{success}
							</Box>
						)}
						<div className="outcome">
							<Form.Control
								type="text"
								name="outcome"
								onChange={handleExtra}
								value={`${extra_data?.outcome}`}
								className="outcome"
								placeholder="Match Winner"
							/>
						</div>
					</>
				)}
				{mybutton && (
					<>
						{main && (
							<Button
								onClick={() => {
									setGameInfo('(ft)');
									setTimeout(() => {
										remove(i);
									}, 19000);
								}}
								variant="outlined"
								type="submit"
								className="butt button"
							>
								{loading ? (
									<CircularProgress
										size="27px"
										sx={{ color: 'warning', width: '10%' }}
									/>
								) : (
									<> Full Time</>
								)}
							</Button>
						)}
					</>
				)}
			</Form>
		</div>
	);
};

export default SideView;
