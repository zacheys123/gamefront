import { useEffect } from 'react';
import { useMainContext } from '../context/context_/MainContext';
import { useAuthContext } from '../context/context_/AuthContext';
import { useSelector } from 'react-redux';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Header, Contact } from '../components';
import Feed from '../components/layout/feed/Feed';
import '../css/Global.css';

import { JWT } from '../context/types/action_type';
import axios from 'axios';

const Home = (props) => {
	const {
		main: { userInfo, contact },

		setMainContext,
	} = useMainContext();

	return (
		<div
			className="home"
			style={{ minHeight: '85.7vh !important' }}
			onClick={() => {
				setMainContext({ type: 'PROFILECHANGE' });
				setMainContext({ type: 'GAMECHANGE' });
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
