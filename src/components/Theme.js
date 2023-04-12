import { useState } from 'react';
import { Stack, Box, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.jpg';
import { useQuery } from '@tanstack/react-query';
import { useMainContext } from '../context/context_/MainContext';
import { ToggleOn, ToggleOff } from '@mui/icons-material';
import { changeTheme } from '../context/features/user_actions';
import axios from 'axios';
const Theme = () => {
	const {
		main: { istheme },
		setMainContext,
	} = useMainContext();
	const [theme, setNewTheme] = useState(true);
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

			return response.data?.theme;
		},
	);

	return (
		<Stack>
			<div>
				{istheme ? (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<ToggleOff
							sx={{
								fontSize: {
									sx: '.7rem',
									sm: '3rem',
									color: 'white',
									cursor: 'pointer',
								},
							}}
							onClick={() => {
								changeTheme(
									adm,
									setMainContext,
									theme,
									userd,
									setNewTheme,
								);
							}}
						/>
						<span>dark mode</span>
					</Box>
				) : (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<ToggleOn
							sx={{
								fontSize: {
									sx: '.7rem',
									sm: '3rem',
									color: 'white',
									cursor: 'pointer',
								},
							}}
							onClick={() => {
								changeTheme(
									adm,
									setMainContext,
									theme,
									userd,
									setNewTheme,
								);
							}}
						/>
						<span>light mode</span>
					</Box>
				)}
			</div>
		</Stack>
	);
};

export default Theme;
