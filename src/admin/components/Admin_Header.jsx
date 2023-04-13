import { useState } from 'react';
import '../css/Header.scss';
import { Box, IconButton, Avatar, Stack } from '@mui/material';
import { Menu, DarkMode, WbSunny } from '@mui/icons-material';
import axios from 'axios';
import { useAdminContext } from '../../context/context_/AdminContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const Header = () => {
	const {
		admin_state: { istheme },
		admin_dispatch,
	} = useAdminContext();
	const navigate = useNavigate();
	const baseUrl = 'https://gamebackend.onrender.com';
	const [adm, setadm] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('profile'));
		if (!storedvalues) {
			return '63e0e63a0e29bee00f60ddf6';
		} else {
			return storedvalues?.result?._id;
		}
	});

	// getting all movies for this user
	const { data: userd, refetch } = useQuery(
		['allusers'],
		async () => {
			const response = await axios.get(`${baseUrl}/user/v2/${adm}`);

			return response.data;
		},
	);
	console.log(userd);
	let source =
		userd && userd.firstname.length > 3 && userd.lastname.length > 3
			? userd?.firstname?.split('')[0].toUpperCase() +
			  userd?.lastname?.split('')[0].toUpperCase()
			: '';
	return (
		<div className="header">
			<Box>
				<h3 className="nav navbar navbar-brand">
					{userd?.company || 'Logo Here'}
				</h3>
			</Box>
			<Box className="toggle__button">
				{istheme ? (
					<IconButton
						onClick={() =>
							admin_dispatch({ type: 'DARKTHEME', payload: istheme })
						}
					>
						<DarkMode />
					</IconButton>
				) : (
					<IconButton
						onClick={() =>
							admin_dispatch({ type: 'LIGHTTHEME', payload: istheme })
						}
					>
						<WbSunny />
					</IconButton>
				)}
				<IconButton className="menu">
					<Menu />
				</IconButton>

				{userd?.profilepicture.length > 1 ? (
					<Avatar />
				) : (
					<div
						style={{
							position: 'relative',
						}}
					>
						<Stack
							sx={{
								background: !istheme && 'magenta !important',
								padding: '.5rem',
								color: !istheme && 'white !important',
							}}
							className="avatar"
						>
							{source}
						</Stack>
					</div>
				)}
			</Box>
		</div>
	);
};

export default Header;
