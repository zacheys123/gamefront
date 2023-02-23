import React from 'react';
import { useNavigate } from 'react-router-dom';
const Network = () => {
	const navigate = useNavigate();
	const adm = JSON.parse(localStorage.getItem('profile'));
	return (
		<div
			style={{ minHeight: '90vh', background: 'white' }}
			className="bg-dark text-muted d-flex align-items-center justify-content-center"
		>
			<div>
				{' '}
				<h5>Page Not Found</h5>
				<ul className="py-2">
					<li className="mt-2">
						This can be caused by typing a wrong url or link
					</li>
					<li>
						{' '}
						The site could be temporarily unavailable or too busy. Try
						again in a few moments.
					</li>
					<li className="mt-2">
						If you are unable to load any pages, check your computer’s
						network connection.
					</li>
					<li className="mt-2">
						Probably a server error from our side,we are working on it
					</li>
				</ul>
				<button
					className="btn btn-primary align-items-end"
					style={{ float: 'right' }}
					onClick={() => navigate(`/login`)}
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

export default Network;
