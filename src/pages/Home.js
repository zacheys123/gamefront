import { useEffect } from 'react';
import { useMainContext } from '../context/context_/MainContext';
import { useAuthContext } from '../context/context_/AuthContext';
import { useSelector } from 'react-redux';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Header, Contact } from '../components';
import Feed from '../components/layout/feed/Feed';
import '../css/Global.css';
import { useQuery } from '@tanstack/react-query';
import { JWT } from '../context/action_type';
import axios from 'axios';

const Home = () => {
	const {
		main: { userInfo, contact },

		setMainContext,
	} = useMainContext();
	const {
		auth_state: { user, logged },
		auth_dispatch,
	} = useAuthContext();
	const id = user?.user?.result?._id;

	return (
		<div className="home" style={{ minHeight: '85.7vh !important' }}>
			<div id="signinbutton" className="contact">
				<div>{contact && <Contact />}</div>
			</div>
			<Feed />
		</div>
	);
};

export default Home;
