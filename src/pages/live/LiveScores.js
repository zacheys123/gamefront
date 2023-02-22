import React from 'react';
import { Box } from '@mui/material';
import './livescore.scss';
import HomeIcon from '@mui/icons-material/Home';
import Search from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
const LiveScores = () => {
	const navigate = useNavigate();
	return (
		<Box className="live">
			<div className="live__header">
				<div className="left_header">
					<HomeIcon onClick={() => navigate('/')} className="homey" />
					<div className="coly">
						<input type="text" placeholder="search Team" />
						<Search className="searchy" />
					</div>
				</div>
				<div className="right_header">
					<h3>LiveScores</h3>
				</div>
			</div>

			<div className="live__body">
				{' '}
				<h6>
					You can now view and analyse sports data from all games
					played
				</h6>
			</div>
		</Box>
	);
};

export default LiveScores;
