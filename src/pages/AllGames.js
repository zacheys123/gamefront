import {
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Stack,
	Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGameContext } from '../context/context_/GameContext';
import { useMainContext } from '../context/context_/MainContext';
import { useQuery } from '@tanstack/react-query';
import '../css/Summary.css';
import { useNavigate } from 'react-router-dom';
const AllGames = () => {
	const baseUrl = 'https://gamebackend.onrender.com';
	const [loading, setLoading] = useState(true);
	const [searchquery, setQuery] = useState('');
	const {
		game: { allgames },
		setGame,
	} = useGameContext();
	const {
		main: { istheme },
		setMainContext,
	} = useMainContext();
	const currUser = JSON.parse(window.localStorage.getItem('profile'));

	const id = currUser?.result?._id;
	const getgames = async (source) => {
		try {
			setLoading(true);
			let response = await axios.get(`${baseUrl}/game/${id}`, {
				cancelToken: source.token,
			});
			setGame({ type: 'LOAD_GAMES', payload: response.data.result });
			setLoading(false);
		} catch (error) {
			setLoading(true);
			setGame({ type: 'ERROR_GAMES' });
		} finally {
			setGame({ type: 'ERROR_GAMES' });
		}
	};

	console.log(allgames);
	useEffect(() => {
		const source = axios.CancelToken.source();
		getgames(source);

		return () => {
			source.cancel();
		};
	}, []);
	const navigate = useNavigate();

	const searchInput = () => {
		let sortedvalue = allgames;
		if (searchquery) {
			sortedvalue = sortedvalue.filter((choose_game) => {
				if (
					choose_game.player1.toLowerCase().includes(searchquery) ||
					choose_game.player2.toLowerCase().includes(searchquery) ||
					choose_game.player1_team
						.toLowerCase()
						.includes(searchquery) ||
					choose_game.player2_team
						.toLowerCase()
						.includes(searchquery) ||
					choose_game.created_at.toLowerCase().includes(searchquery)
				) {
					return sortedvalue;
				}
			});
		}
		return sortedvalue;
	};

	return (
		<Box
			className="all__games"
			style={{ background: istheme ? 'white' : 'black' }}
			onClick={() => setMainContext({ type: 'PROFILECHANGE' })}
		>
			<Box
				style={{
					background: !istheme ? 'red !important' : 'white',
				}}
			>
				{' '}
				<header
					className="header"
					style={{
						background: !istheme ? 'red !important' : 'white',
					}}
				>
					<h4 align="center"> Data Hub</h4>
				</header>
			</Box>

			<Box className="players">
				<Box
					sx={{
						width: '40%',
						padding: '.7rem',
						borderRadius: '50px',
						background: !istheme ? 'lightgrey' : 'grey',
						display: 'flex',
						margin: '1rem  auto 0 auto ',
						alignItems: 'center',
					}}
					className="search__input"
				>
					<input
						type="text"
						placeholder="Search by: (player,team,date)"
						value={searchquery}
						onChange={(ev) => setQuery(ev.target.value)}
						style={{
							outline: 'none',
							border: 'none',
							flex: 1,
							marginLeft: '.6rem',
							background: 'inherit',
							color: !istheme ? 'black' : 'white',
							fontWeight: 'bold',
							display: 'flex',
						}}
					/>
					<SearchIcon
						className="search_"
						sx={{
							cursor: 'pointer',
							fontSize: '2rem',
							color: 'white',
						}}
					/>
				</Box>
				{loading ? (
					<Stack style={{ display: 'flex', flexWrap: 'wrap' }}>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton
								variant="text"
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton
								variant="circular"
								width={40}
								height={40}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton
								variant="rounded"
								width={210}
								height={60}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
						</Stack>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton
								variant="text"
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton
								variant="circular"
								width={40}
								height={40}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton variant="rounded" width={210} height={60} />
						</Stack>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton
								variant="text"
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton
								variant="circular"
								width={40}
								height={40}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
							<Skeleton
								variant="rounded"
								width={210}
								height={60}
								sx={{
									fontSize: '1rem',
									background: !istheme ? 'lightgrey' : 'grey',
								}}
							/>
						</Stack>
					</Stack>
				) : (
					<div
						style={{ width: '100%', margin: '0.5rem auto' }}
						className="summ"
					>
						<table className="table table-bordered table-stripped ">
							<thead>
								<tr
									className="bg-dark"
									style={{ color: istheme ? 'white' : 'yellow' }}
								>
									<th>Ply1</th>
									<th>Ply2</th>
									<th>P1_Team</th>
									<th>P2_Team</th>
									<th>P1_Score</th>
									<th>P2_Score</th>
									<th>Winner</th>
									<th>St No</th>
									<th>Amt</th>
									<th>Paid</th>
									<th style={{ color: istheme ? 'red' : 'orange' }}>
										Bst of 2
									</th>
									<th style={{ color: istheme ? 'red' : 'cyan' }}>
										Penalty
									</th>
									<th style={{ color: istheme ? 'red' : 'red' }}>
										Bal
									</th>
								</tr>
							</thead>
							{searchInput()?.map((game, index) => {
								return (
									<tbody key={index}>
										<tr
											style={{
												color: !istheme ? 'white' : 'black',
											}}
										>
											<td>{game.player1}</td>
											<td>{game.player2}</td>
											<td>{game.player1_team}</td>
											<td>{game.player2_team}</td>
											<td>{game.p1goals}</td>
											<td>{game.p2goals}</td>
											<td>{game.outcome}</td>
											<td>{game.station}</td>
											<td>
												{' '}
												{game.amount === '' || game.amount === 0
													? '-'
													: game.amount}
											</td>
											<td>
												{game.paid === '' || game.amount === 0
													? '-'
													: game.paid}
											</td>
											<td>
												{game.best_amount === '' || game.amount === 0
													? '-'
													: game.best_amount}
											</td>
											<td>
												{game.penalty_amount === '' ||
												game.penalty_amount === 0
													? '-'
													: game.penalty_amount}
											</td>
											<td>{parseFloat(game.amount - game.paid)}</td>
										</tr>
									</tbody>
								);
							})}
						</table>
					</div>
				)}
			</Box>
		</Box>
	);
};

export default AllGames;
