import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

const Priv_Admin = ({ children }) => {
	const location = useLocation();
	const [user, setUser] = React.useState(() => {
		const storedvalues = localStorage.getItem('admin_log');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});

	if (!user?.result?._id) {
		return (
			<Navigate
				to="/admin/v1/:id/login"
				state={{ from: location.pathname }}
			/>
		);
	}
	return children;
};
export default Priv_Admin;
