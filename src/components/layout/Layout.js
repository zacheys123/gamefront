import { useState, useCallback, useRef, useEffect } from 'react';
import { Stack, Box, Button } from '@mui/material';
import Header from '../Header';
import axios from 'axios';
import './Layout.css';
import '../../css/auth.scss';
import { useMainContext } from '../../context/context_/MainContext';
import { useAuthContext } from '../../context/context_/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Footer from '../Footer';
import { Form } from 'react-bootstrap';
import { adminLogin } from '../../context/features/adminLogin';
import { useNavigate, useLocation } from 'react-router-dom';
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
	const { main: mytheme } = useMainContext();
	// getting all movies for this user
	const { data: alldata, refetch } = useQuery(
		['allusers'],
		async () => {
			const response = await axios.get(`${baseUrl}/user/v2/${adm}`);

			return response.data;
		},
	);
	const location = useLocation();
	console.log(mytheme);
	return (
		<Stack className="layout">
			<>
				<Box className="layout_header_container">
					<Header userd={alldata} refetch={refetch} />
				</Box>

				<Box className="children">{children}</Box>
			</>

			<Footer />
		</Stack>
	);
};

export default Layout;
