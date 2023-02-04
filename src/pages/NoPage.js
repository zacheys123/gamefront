import React from 'react';

const NoPage = () => {
	return (
		<div
			style={{ minHeight: '90vh', background: 'white' }}
			className="bg-dark text-muted d-flex align-items-center justify-content-center"
		>
			<div>
				{' '}
				<h6>Page Not Found</h6>
				<ul>
					<li>This can be caused by typing a wrong url or link</li>
					<li>Check your internet connection to the internet</li>
					<li>
						Probably a server error from our side,we are working on it
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NoPage;
