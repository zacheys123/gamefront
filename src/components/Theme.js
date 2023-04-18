import { useState, useEffect } from 'react';
import { Stack, Box, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.jpg';
import { useQuery } from '@tanstack/react-query';
import { useMainContext } from '../context/context_/MainContext';
import '../css/Global.css';
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
		setMainContext({
			type: 'SHOWTHEME',
			payload: mytheme,
		});
		window.localStorage.setItem('theme', istheme);
	};
	return (
		<Stack>
			<div>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					className={
						!istheme
							? 'active__theme th__cont'
							: 'not_active__theme th__cont'
					}
					onClick={handleTheme}
				>
					<>
						<input type="checkbox" checked={istheme} />
					</>{' '}
					<span>Light Theme</span>
				</Box>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					className={
						istheme
							? 'active__theme th__cont'
							: 'not_active__theme th__cont'
					}
					onClick={handleTheme}
				>
					<>
						<input type="checkbox" checked={!istheme} />
					</>{' '}
					<span>Dark Theme</span>
				</Box>
			</div>
		</Stack>
	);
};

export default Theme;
