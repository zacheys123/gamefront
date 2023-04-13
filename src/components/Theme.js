import { useState, useEffect } from 'react';
import { Stack, Box, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.jpg';
import { useQuery } from '@tanstack/react-query';
import { useMainContext } from '../context/context_/MainContext';
import { ToggleOn, ToggleOff } from '@mui/icons-material';
import { changeTheme } from '../context/features/user_actions';
import axios from 'axios';
const Theme = ({ userd }) => {
	const {
		main: { istheme, mytheme },
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

	const user_theme = userd?.theme;
	const usertheme = JSON.parse(localStorage.getItem('theme'));
	const handleTheme = () => {
		setMainContext({
			type: 'UPDATE_THEME',
			payload: istheme,
		});
		window.localStorage.setItem('theme', istheme);
	};
	return (
		<Stack>
			<div>
				{usertheme ? (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<ToggleOff
							sx={{
								fontSize: '3rem',
								sx: '.7rem',
								sm: '3rem',
								color: !usertheme && 'violet',
								cursor: 'pointer',
							}}
							onClick={handleTheme}
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
								fontSize: '3rem',
								sx: '.7rem',
								sm: '3rem',
								color: usertheme && 'purple',
								cursor: 'pointer',
							}}
							onClick={handleTheme}
						/>
						<span>light mode</span>
					</Box>
				)}
			</div>
		</Stack>
	);
};

export default Theme;
