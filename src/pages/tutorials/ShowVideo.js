import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { data } from './vid';
import './Tutorials.scss';
const ShowVideo = () => {
	const { id } = useParams();
	const myvid = data.find((vid) => {
		return vid.id == id;
	});

	if (myvid === undefined) {
		console.log('error');
	}
	const { src, description } = myvid;

	console.log(data);
	return (
		<div className="container-fluid single_vid">
			<div classNae="single">
				<video src={src} controls autoplay />
				<h6>{description}</h6>
				<Link to="/vids/tutorials" style={{ color: 'blue' }}>
					back to page
				</Link>
			</div>
		</div>
	);
};

export default ShowVideo;
