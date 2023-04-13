import React, { useState, useEffect, useRef } from 'react';
import {
	Stack,
	Box,
	Button,
	Typography,
	Avatar,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import '../css/Global.css';
import '../css/Header.scss';
import logo from '../assets/logo2.jpg';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from '../context/context_/MainContext';
import { useAuthContext } from '../context/context_/AuthContext';
import { setLogout } from '../redux/features/authSlice';
import Theme from './Theme';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import {
	setFree,
	setAmateur,
	setWorld,
	setPremium,
} from './planRefs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Header = () => {
	const {
		main: { contact, auth, profile, moreinfo },
		setMainContext,
	} = useMainContext();
	const {
		auth_state: { user, logged },
		auth_dispatch,
	} = useAuthContext();
	const data_result = JSON.parse(localStorage.getItem('profile'));
	const admin_result = JSON.parse(localStorage.getItem('admin_log'));
	const id = data_result?.result?._id;
	const [admin_id, setAdmlog] = useState(() => {
		const storedvalues = JSON.parse(
			localStorage.getItem('admin_log'),
		);
		if (!storedvalues) {
			return '';
		} else {
			return storedvalues?.result?._id;
		}
	});

	const navigate = useNavigate();

	const [active, setActive] = useState(false);
	const [prof, setProf] = useState(false);

	const dashboard = () => {
		setActive(false);
		setMainContext({ type: 'PROFILECHANGE' });
		if (!admin_id) {
			navigate(`/admin/v1/${id}/login`);
		} else {
			navigate(`/admin/v1/${id}/admin-panel`);
		}
	};
	const prof_ = () => {
		setActive(true);
		setProf(false);
	};
	const contacts = (ev) => {
		ev.preventDefault();
		setMainContext({ type: 'CONTACT', payload: contact });
	};

	const handleLogout = () => {
		window.localStorage.removeItem('profile');
		window.localStorage.removeItem('userInfo');
		window.localStorage.removeItem('games');
		dashboard();
		setMainContext({ type: 'PROFILE' });
		navigate('/');
		window.location.reload();
	};

	const [userInfo, setuserInfo] = useState(() => {
		let storeduserinfo = localStorage.getItem('userInfo');
		if (!storeduserinfo) {
			return '';
		}
		return storeduserinfo.replace(/["]/g, '');
	});

	const location = useLocation();
	const game = useRef();
	const summary = useRef();
	const league = useRef();
	const livescore = useRef();
	const ranking = useRef();
	const vids = useRef();
	const access = useRef();
	const chat = useRef();
	const share = useRef();
	const allrefs = {
		game,
		summary,
		league,
		ranking,
		vids,
		chat,
		access,
		share,
		livescore,
	};
	useEffect(() => {
		switch (userInfo) {
			case 'Free':
				setFree(allrefs);
			case 'Amateur':
				setAmateur(allrefs);
			case 'World':
				setWorld(allrefs);
			case 'Premium':
				setPremium(allrefs);
		}
	});
	const baseUrl = 'https://gamebackend.onrender.com';
	const [adm, setadm] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('profile'));
		if (!storedvalues) {
			return '63e0e63a0e29bee00f60ddf6';
		} else {
			return storedvalues?.result?._id;
		}
	});

	// getting all data for this user
	const { data: userd, refetch } = useQuery(['users'], async () => {
		const response = await axios.get(`${baseUrl}/user/v2/${adm}`);

		return response.data;
	});
	console.log(userd);
	let source =
		userd &&
		userd?.firstname?.length > 3 &&
		userd?.lastname?.length > 3
			? userd?.firstname?.split('')[0].toUpperCase() +
			  userd?.lastname?.split('')[0].toUpperCase()
			: '';
	const info = userd?.package;
	const istheme = JSON.parse(window.localStorage.getItem('theme'));
	return (
		<>
			{!admin_result && (
				<>
					{location.pathname !== `/${id}/v2/livescore` ? (
						<>
							{userInfo && (
								<Stack
									sx={{ display: id ? 'flex' : 'none' }}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									className={
										!istheme ? 'header' : 'bg-dark text-light'
									}
								>
									<Box
										className="moreinfo"
										onClick={() => {
											setMainContext({ type: 'PROFILECHANGE' });
										}}
									>
										<>
											{!moreinfo ? (
												<MenuIcon
													sx={{
														margin: 'auto 3rem auto 2rem',
														cursor: 'pointer',
													}}
													onClick={() =>
														setMainContext({ type: 'GAME' })
													}
												/>
											) : (
												<CloseIcon
													sx={{
														margin: 'auto 3rem auto 2rem',
														cursor: 'pointer',
													}}
													onClick={() =>
														setMainContext({ type: 'GAME' })
													}
												/>
											)}
										</>

										{moreinfo ? (
											<Box className="morenav">
												<AnimatePresence>
													<motion.div
														key="box"
														initial={{ x: '-200px' }}
														animate={{
															x: '-13px',
															y: '1.5rem',
															transition: {
																duration: 0.8,
																ease: 'easeOut',
															},
														}}
														exit={{
															x: '13px',
															y: '4.5rem',
															opacity: 0,
														}}
														transition={{
															duration: 0.8,
															ease: 'easeOut',
														}}
														className="lessnav"
														style={{
															background: istheme
																? 'rgb(28, 4, 4)'
																: 'white',
															border:
																!istheme &&
																'1px solid rgb(242, 239, 239)',
															zIndex: 999,
														}}
													>
														<Link
															ref={game}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/game"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Game
															</Button>
														</Link>
														<li
															ref={summary}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
														>
															{' '}
															<Button
																onClick={() => {
																	setMainContext({
																		type: 'GAMECHANGE',
																	});
																	navigate('/summary');
																}}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Summary
															</Button>
														</li>
														<Link
															ref={league}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/standings"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Explore Leagues
															</Button>
														</Link>
														<div
															ref={livescore}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															onClick={() => {
																setMainContext({
																	type: 'GAMECHANGE',
																});
																navigate(`/${id}/v2/livescore`);
															}}
														>
															{' '}
															<Button
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Livecores
															</Button>
														</div>
														<Link
															ref={ranking}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/ranking"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Player Ranking
															</Button>
														</Link>
														<Link
															ref={vids}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/vids"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Watch Videos
															</Button>
														</Link>
														<Link
															ref={access}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/access-saved"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Access Saved Videos
															</Button>
														</Link>
														<Box
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															onClick={() =>
																setMainContext({
																	type: 'THEMECHANGE',
																})
															}
														>
															{' '}
															<Button
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Change Theme
															</Button>
														</Box>
														<Link
															ref={chat}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/chat"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Create A Chat Room
															</Button>
														</Link>
														<Link
															ref={share}
															className={
																id
																	? userInfo
																		? 'item'
																		: 'disabled'
																	: 'disabled'
															}
															to="/share"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Share Videos
															</Button>
														</Link>
														<Link
															className={
																id ? 'item about' : 'disabled'
															}
															to="/standings"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																About Us
															</Button>
														</Link>
														<Link
															className={
																id ? 'item contacts' : 'disabled'
															}
															to="/standings"
														>
															{' '}
															<Button
																onClick={() =>
																	setMainContext({
																		type: 'GAMECHANGE',
																	})
																}
																style={{
																	color: istheme
																		? 'white'
																		: 'darkgreen',
																	border: istheme
																		? '1px solid lightgrey'
																		: '1px solid violet',
																}}
																variant="outlined"
																size="small"
															>
																Contact Us
															</Button>
														</Link>
													</motion.div>
												</AnimatePresence>
											</Box>
										) : (
											''
										)}
									</Box>

									<Box className="logo  d-flex">
										{' '}
										<>
											<h6
												className="title__name"
												onClick={() => navigate('/')}
												style={{
													cursor: 'pointer',
													color: 'green',
													textShadow: !istheme
														? '2px -3px 20px #a51e62, -2px 1px 30px #ff99cc'
														: '',
												}}
											>
												{userd?.company
													? userd?.company
													: ' GameHubz co'}
											</h6>
										</>
									</Box>

									<Box className=" mynav">
										<li className={id ? 'item' : 'disabled'}>
											{' '}
											<Link
												to="/"
												className="butt"
												style={{
													color: istheme ? 'greenyellow' : 'black',
													listtype: 'none',
													marginLeft: '1.3rem',
													textDecoration: 'none',
												}}
											>
												Home
											</Link>
										</li>

										<li className={id ? 'item' : 'disabled'}>
											{' '}
											<Link
												className="butt"
												to="/"
												style={{
													color: istheme ? 'greenyellow' : 'black',
													listtype: 'none',
													marginLeft: '1.3rem',
													textDecoration: 'none',
												}}
											>
												About
											</Link>
										</li>

										{location.pathname === '/' && (
											<li className={id ? 'item' : 'disabled'}>
												{' '}
												<Link
													style={{
														color: istheme ? 'greenyellow' : 'black',
														marginLeft: '1.3rem',
														textDecoration: 'none',
													}}
													className="butt conta"
													onClick={contacts}
													to=""
												>
													Contact
												</Link>
											</li>
										)}

										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
											className="theming"
										>
											<Theme userd={userd} />
										</Box>

										<Box className="auth">
											{!auth && (
												<Box className="userdata">
													{' '}
													<h6
														style={{
															margin: '.2rem auto -.3rem 5rem',
														}}
													>
														{' '}
														<span
															style={{
																color: istheme ? 'white' : 'black',
															}}
														>
															User Email:&nbsp;
														</span>{' '}
														<span
															style={{
																color: istheme ? 'yellow' : 'red',
															}}
														>
															{userd?.email}
														</span>
													</h6>
												</Box>
											)}
										</Box>
									</Box>

									<div
										className={id ? 'd-block myprof' : 'd-none'}
										style={{
											position: 'relative',
										}}
										onMouseOver={() =>
											setMainContext({ type: 'PROFILE' })
										}
										onMouseOut={() =>
											setMainContext({ type: 'PROFILE' })
										}
									>
										<Stack
											sx={{
												background: istheme && 'cyan !important',
												color: istheme
													? 'indigo !important'
													: 'white',
											}}
											className="avatar"
										>
											{source}
										</Stack>

										{profile && (
											<Box
												sx={{
													position: 'absolute',
													background: 'black',
													padding: '1rem',
													borderRadius: '10px',
													right: '1rem',
													width: '15rem',
													zIndex: '999',
												}}
											>
												<Typography
													onClick={dashboard}
													variant="body2"
													className={!active ? 'acti' : 'inacti'}
												>
													Admin
												</Typography>
												<Typography
													className={active ? 'acti' : 'inacti'}
													variant="body2"
													sx={{
														color: 'white',
														padding: '1rem',
														textAlign: 'center',
													}}
													onClick={() => {
														setTimeout(() => {
															prof_();
															navigate(`/v2/${id}`);
														}, 200);
														setMainContext({ type: 'PROFILE' });
														return userInfo;
													}}
												>
													View Profile
												</Typography>
												<Typography
													variant="body2"
													sx={{
														color: 'white',
														padding: '1rem',
														textAlign: 'center',
														cursor: 'pointer',
													}}
													onClick={() => window.location.reload()}
												>
													Refresh
												</Typography>{' '}
												<Typography
													variant="body2"
													onClick={() => {
														navigate('/v2/package-plan');
														setMainContext({ type: 'PROFILE' });
													}}
													style={{
														color: !istheme ? 'yellow' : 'black',
														fontWeight: 'bold',
														padding: '1rem',
														cursor: 'pointer',
														textAlign: 'center',
													}}
												>
													Change({userInfo}) Plan
												</Typography>
												<Button
													style={{ marginLeft: '1rem !important' }}
													onClick={handleLogout}
													variant="outlined"
													size="small"
												>
													Log Out
												</Button>
											</Box>
										)}
									</div>
								</Stack>
							)}
						</>
					) : (
						''
					)}
				</>
			)}
		</>
	);
};

export default Header;
