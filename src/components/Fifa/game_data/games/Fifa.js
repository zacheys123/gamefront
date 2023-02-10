import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stack, Box } from '@mui/material';

import './css/Fifa.scss';
import fifa23 from '../../../../assets/fifa.mp4';

import Categories from '../fifa_categories/Categories';
import Modes from '../../Fifa_Modes';
const Fifa = () => {
	const [team, setTeam] = useState('');
	const [modes, setModes] = useState(null);
	const [mode_vid, setModevid] = useState(true);
	const parentref = (mode_refs) => {
		setModes(mode_refs);
	};
	// ATBBXUZg4AgxuJFtDqzrrDj33tfDD167C7F4
	const vidref = useRef();
	useEffect(() => {
		vidref.current.style.display = 'block';
	}, []);

	return (
		<>
			<Stack
				height="100%"
				style={{
					background: 'transparent',
					display: 'flex',
					minHeight: '80vh',
				}}
			>
				<Box sx={{ flex: 1 }}>
					{' '}
					<Categories modes={modes} vidref={vidref} />
				</Box>
				<Box
					sx={{
						flex: 9,
						background: 'black',
						position: 'relative',
						minHeight: '85vh',
					}}
				>
					<Box
						ref={vidref}
						sx={{
							height: '100%',
							width: '90vw',
							marginLeft: '4.4rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
						}}
						className="vids"
					>
						{' '}
						<video
							src={fifa23}
							autoPlay={true}
							controls
							style={{
								margin: 'auto 0  ',
								height: '70%',
								width: '100% !important',
							}}
						></video>
						<h4 align="center" style={{ color: 'lightgrey' }}>
							Welcome to Gamehub Modes Selection Page
						</h4>
					</Box>

					<Modes parentref={parentref} />
				</Box>
			</Stack>
		</>
	);
};

export default Fifa;
