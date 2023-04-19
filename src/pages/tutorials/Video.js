import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Play from '@mui/icons-material/PlayCircle';
import { useParams, useNavigate } from 'react-router-dom';
const Video = ({ vid }) => {
	const { id, src, description } = vid;

	const navigate = useNavigate();
	return (
		<Card className="card-content">
			<CardContent onClick={() => navigate(`/vids/tutorials/${id}`)}>
				<Play
					className="play"
					sx={{ fontSize: '1.9rem !important' }}
				/>

				<video src={src} />
				<Typography variant="body">{description}</Typography>
			</CardContent>
		</Card>
	);
};

export default Video;
