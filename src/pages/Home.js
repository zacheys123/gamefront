import { useEffect } from 'react';
import { useMainContext } from '../context/context_/MainContext';
import { useAuthContext } from '../context/context_/AuthContext';
import { useSelector } from 'react-redux';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Header, Contact } from '../components';
import Feed from '../components/layout/feed/Feed';
import '../css/Global.css';
import { Menu, DarkMode, WbSunny } from '@mui/icons-material';
import { JWT } from '../context/types/action_type';
import axios from 'axios';
import { Box } from '@mui/material';
import Theme from '../components/Theme';

const Home = (props) => {
	const {
		main: { istheme, contact, mytheme },

		setMainContext,
	} = useMainContext();

	return (
		<div
			className="home"
			style={{
				minHeight: '85.7vh !important',
			}}
			onClick={() => {
				setMainContext({ type: 'PROFILECHANGE' });
				setMainContext({ type: 'GAMECHANGE' });
				setMainContext({ type: 'REMOVE_THEME', payload: mytheme });
			}}
		>
			<div id="signinbutton" className="contact">
				<div>{contact && <Contact />}</div>
			</div>
			<Feed />
		</div>
	);
};

export default Home;
