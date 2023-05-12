import React, { useState, useEffect } from 'react';
import { data } from './vid';
import Video from './Video';
import { Skeleton, Stack } from '@mui/material';
import { useGameContext } from '../../context/context_/GameContext';
const Videos_Room = ({ loading }) => {
	const {
		videos: {
			fifa_state,
			ghost_state,
			grand_state,
			god_state,
			last_state,
			most_state,
			mortal_state,
			cod_state,
			fort_state,
			unchartered_state,
		},
	} = useGameContext();

	const checkvids = () => {
		let sortedvideos = data;

		if (fifa_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid?.src.split('/')[3].split('_')[0] === 'fifa';
			});
		} else if (ghost_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid?.src.split('/')[3].split('_')[0] === 'ghost';
			});
		} else if (grand_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'grand';
			});
		} else if (god_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'god';
			});
		} else if (last_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'last';
			});
		} else if (most_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'most';
			});
		} else if (mortal_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid?.src.split('/')[3].split('_')[0] === 'mortal';
			});
		} else if (cod_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'cod';
			});
		} else if (fort_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'fort';
			});
		} else if (unchartered_state) {
			sortedvideos = sortedvideos.filter((vid) => {
				return vid.src.split('_')[0] === 'unchartered';
			});
		}
		localStorage.setItem('videos', JSON.stringify(sortedvideos));
		return sortedvideos;
	};
	console.log(checkvids());

	const istheme = JSON.parse(localStorage.getItem('theme'));
	return (
		<React.Fragment>
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
				<div className="video">
					{checkvids().map((vid, idx) => {
						return <Video vid={vid} key={idx} idx={idx} />;
					})}
				</div>
			)}
		</React.Fragment>
	);
};

export default Videos_Room;
