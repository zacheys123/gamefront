import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { Stack, Box, TextField, Button } from '@mui/material';
import { useGameContext } from '../../../../context/context_/GameContext';
import { Form, Card } from 'react-bootstrap';
import { Game_Reg } from '../../../../context/features/gameSlice';
import CircularProgress from '@mui/material/CircularProgress';
const SideView = ({ mygames }, { game_data, setTemp, rec_match }) => {
	const {
		modes_state: {
			game_info,
			loading,
			error,
			iserror,
			success,
			issuccess,
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
	});
	const game_dataref = useRef();

	const setGame = useCallback(
		(ev) => {
			ev.preventDefault();

			const matchno = /^[0-9]*$/;
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

	const remove = (index) => {
		// window.localStorage.getItem('rec_games');
		// rec_match.splice(index, 1);
		// window.localStorage.setItem(
		// 	'rec_games',
		// 	JSON.stringify([...rec_match, game_data]),
		// );

		const newGames = rec_match.filter((gam) => gam._id !== index);
		setTemp(newGames);
	};
	const [mybutton, setButton] = useState(true);

	useEffect(() => {
		game_dataref.current = extra_data;
	}, []);
	return (
		<div className="game-container">
			{' '}
			<Form autoComplete="off" onSubmit={setGame}>
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
						/>
					</Box>
				</div>
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
				{iserror && (
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
						value={extra_data?.outcome}
						className="outcome"
						placeholder="Match Winner"
					/>
				</div>
				{mybutton && (
					<>
						<Button
							variant="outlined"
							type="submit"
							className="butt button"
						>
							{loading ? (
								<CircularProgress
									color="secondary"
									sx={{
										fontSize: '.6rem !important',
										marginRight: '.6rem',
									}}
								/>
							) : (
								<> End/Save Match</>
							)}
						</Button>
						<Button
							variant="outlined"
							type="submit"
							onClick={() => remove(_id)}
							className="butt"
						>
							Remove
						</Button>
					</>
				)}
			</Form>
		</div>
	);
};

export default SideView;
