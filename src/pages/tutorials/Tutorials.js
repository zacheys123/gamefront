import React from 'react';
import { useGameContext } from '../../context/context_/GameContext';
import { useMainContext } from '../../context/context_/MainContext';
import './Tutorials.scss';
import { Box, Stack } from '@mui/material';
import Videos_Room from './Videos_Room';
const Tutorials = () => {
	const {
		main: { mytheme },
		setMainContext,
	} = useMainContext();
	const istheme = JSON.parse(localStorage.getItem('theme'));

	return (
		<div
			className={!istheme ? 'tutorial__container' : 'darkmode '}
			onClick={() => {
				setMainContext({ type: 'PROFILECHANGE' });
				setMainContext({ type: 'GAMECHANGE' });
				setMainContext({ type: 'REMOVE_THEME', payload: mytheme });
			}}
		>
			<Stack className="stack__games">
				<Box className=" game__cont">
					<Box className="list_games">
						<ul>
							<li>Fifa</li>
							<li>God Of War</li>
							<li>Grand Theft Auto</li>
							<li>Ghost Recon</li>
							<li>Most Wanted</li>
							<li>Unchartered</li>
							<li>Fortnite</li>
							<li>Call Of Duty</li>
							<li>The Last Of Us</li>
							<li>Mortal Kombat</li>
						</ul>
					</Box>
				</Box>
				<Box className="videos">
					<Videos_Room />
				</Box>
			</Stack>
		</div>
	);
};

export default Tutorials;
