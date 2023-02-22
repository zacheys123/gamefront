import { useState, lazy } from 'react';
import { Stack, Box } from '@mui/material';

import axios from 'axios';
import './Layout.css';
import { useQuery } from '@tanstack/react-query';
import Footer from '../Footer';
const Layout = ({ children }) => {
	const baseUrl = 'https://gaminbackendz.onrender.com';
	const [adm, setadm] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('profile'));
		if (!storedvalues) {
			return '63e0e63a0e29bee00f60ddf6';
		} else {
			return storedvalues?.result?._id;
		}
	});

	// getting all movies for this user
	const { data: alldata, refetch } = useQuery(
		['allusers'],
		async () => {
			const response = await axios.get(`${baseUrl}/user/v2/${adm}`);

			return response.data;
		},
	);

	return (
		<Stack className="layout">
			<Box className="children">{children}</Box>
			<Footer />
		</Stack>
	);
};

export default Layout;
