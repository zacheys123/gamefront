import React from 'react';

const Network = () => {
	return (
		<div className="bg-dark text-muted d-flex align-items-center justify-content-center">
			<div>
				{' '}
				<h6>Page Not Found</h6>
				<ul>
					<li>This can be caused by entering a wrong url</li>
					<li>Chech your connection to the internet</li>
					<li>
						Probably a server error from our side,we are working on it
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Network;
