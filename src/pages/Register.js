import { useState, useCallback, useRef, useEffect } from 'react';

import '../css/auth.scss';
import Modal from './profile/Modal';
import {
	Stack,
	Card,
	Button,
	Container,
	CircularProgress,
	Box,
} from '@mui/material';
import { useAuthContext } from '../context/context_/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../context/features/admin';
import {
	WRONGPASSWORD,
	EMPTY,
	PASSWORDLENGTH,
	CLOSEMODAL,
} from '../context/action_type';
import {
	name,
	email,
	business,
	info,
	password,
} from './utils/registutils';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { motion } from 'framer-motion';
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Register(props) {
	const {
		auth_state: {
			ismodal,
			modalcontent,
			loading,
			success_auth,
			error_auth,
			regerror,
			auth_name,
			auth_email,
			auth_info,
			auth_bs,
			auth_password,
			error_reg,
		},
		auth_dispatch,
	} = useAuthContext();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		company: '',
		company_type: '',
		phone1: '',
		state: '',
		phone: '',
		email: '',
		password: '',
		confirmpassword: '',
		username: '',
	});
	const [passmessage, setMessage] = useState('');
	const [border_color, setBorder] = useState('none');
	const [color, setColor] = useState('white');
	const [passw, setPassw] = useState(false);
	const [register, setRegister] = useState(false);
	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setUser({ ...user, [name]: value });
	};
	// Register admin
	const adminData = useRef();
	const handleSubmit = useCallback((ev) => {
		ev.preventDefault();
		if (
			adminData?.current.firstname &&
			adminData?.current.lastname &&
			adminData?.current.password &&
			adminData?.current.email &&
			adminData?.current.company &&
			adminData?.current.phone &&
			adminData?.current.confirmpassword
		) {
			if (adminData?.current?.password.length > 6) {
				console.log(adminData.current);
				if (
					adminData?.current?.password ===
					adminData?.current?.confirmpassword
				) {
					createAdmin(
						navigate,
						auth_dispatch,
						loading,
						adminData,
						passmessage,
					);
				} else {
					auth_dispatch({
						type: WRONGPASSWORD,
						modalcontent: 'Both Passwords Should Match',
					});
				}
			} else {
				auth_dispatch({
					type: PASSWORDLENGTH,
					modalcontent:
						'Username or Password should be at least 6 characters long',
				});
			}
		} else {
			console.log(adminData.current);
			auth_dispatch({
				type: EMPTY,
				modalcontent: 'Cannot submit empty inputs',
			});
		}
	}, []);

	const closemodal = () => {
		auth_dispatch({ type: CLOSEMODAL });
	};
	useEffect(() => {
		adminData.current = user;
	}, [user, register]);
	//
	const variants = {
		initial: {
			x: '100%',
			opacity: 0,
		},
		animate: {
			x: ['100%', '0%', '-5%', '0%'],
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.6,
			},
		},
	};

	const handleStrength = () => {
		if (user.password.length > 0 && user.password.length <= 4) {
			setMessage(() => {
				return 'Weak password';
			});
			setBorder(() => {
				return '2px solid red';
			});
			setColor(() => {
				return ' red';
			});
		} else if (
			user.password.length >= 5 &&
			user.password.length < 8
		) {
			setMessage(() => {
				return 'Medium Strong password';
			});
			setBorder(() => {
				return '2px solid purple';
			});
			setColor(() => {
				return ' yellow';
			});
		} else if (user.password.length >= 8) {
			setMessage(() => {
				return 'Strong  password';
			});
			setBorder(() => {
				return '3px solid red';
			});
			setColor(() => {
				return ' greenyellow';
			});
		} else {
			return;
		}
	};
	console.log(passmessage);
	return (
		<Card
			className="auth_page"
			style={{ height: props.height || '' }}
		>
			<Stack className="form__page">
				<Box
					className="form__left"
					style={{
						borderRight: '1px solid lightgrey',
						height: '65vh',
						margin: 'auto 0',
					}}
				>
					<h2 style={{ color: 'white', fontSize: '3rem' }}>
						Welcome{' '}
						<span
							style={{
								color: 'orange',
								fontSize: '2.4rem ',
								fontWeight: 'bold',
								fontFamily: 'ariel',
								fontStyle: 'italics',
								textShadow: ' 4px 4px 4px #aae4a',
							}}
						>
							{user.firstname},
						</span>{' '}
					</h2>
					<div className="wrapper">
						<span
							style={{
								fontSize: '2rem ',
								color: 'yellow',
								fontWeight: 'bold',

								textShadow: ' 4px 4px 4px #aae4a',
							}}
							className="static-txt"
						>
							<span style={{ color: 'violet' }}>GameHubz</span> is a
							platform that makes it easy for you to
						</span>
						<ul className="dynamic-txts">
							<li>
								<span style={{ color: 'cyan', fontWeight: '700' }}>
									{' '}
									Organize.
								</span>
							</li>
							<li>
								<span style={{ color: 'magenta', fontWeight: '700' }}>
									Manage.{' '}
								</span>
							</li>
							<li>
								<span
									style={{ color: 'greenyellow', fontWeight: '700' }}
								>
									{' '}
									View
								</span>
							</li>
						</ul>
					</div>
					<motion.div
						initial={{ x: '-200%', opacity: 0 }}
						animate={{
							x: ['-5%', '15%', '25%', '25%', '0%'],
							y: '1rem',
							opacity: 1,
							transition: { duration: 0.5, delay: 10 },
						}}
						className="description"
					>
						Access your Movie Orders faster, accurate, and Efficient.
						Its scheduling feature further enables you to be well
						informed with suggested, latest and upcoming movies.
					</motion.div>{' '}
				</Box>
				<div className="divider"></div>
				<Box className="form__right">
					{ismodal && (
						<Modal
							closemodal={closemodal}
							modalcontent={modalcontent}
							success={success_auth}
							error={error_auth}
						/>
					)}
					{!register ? (
						<Box className="regist">
							<Button
								variant="contained"
								className="btn btn-primary"
								onClick={() => setRegister((prev) => !prev)}
							>
								Register
							</Button>
						</Box>
					) : (
						<Box className="form__center">
							<form className="form">
								{!auth_name && (
									<motion.div
										style={{ position: 'absolute !important' }}
										variants={variants}
										initial="initial"
										animate="animate"
									>
										<h6 style={{ color: 'yellow' }}>
											The fields below are required for
											identity.NB:All fields should be entered here!!
										</h6>
										<div className="form-group">
											<input
												placeholder="Firstname"
												autoComplete="off"
												name="firstname"
												value={user.firstname}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
										</div>
										<div className="form-group">
											<input
												placeholder="Lastname"
												name="lastname"
												value={user.lastname}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
										</div>
										{regerror && (
											<p
												style={{
													margin: '1rem auto 0 2rem',
												}}
											>
												{modalcontent}
											</p>
										)}
										<Button
											onClick={() =>
												name(
													auth_dispatch,
													auth_email,
													user.firstname,
													user.lastname,
													regerror,
												)
											}
											variant="contained"
											className="bg-primary"
										>
											Next
										</Button>
									</motion.div>
								)}
								{auth_email && (
									<motion.div
										style={{ position: 'absolute !important' }}
										variants={variants}
										initial="initial"
										animate="animate"
									>
										<h6 style={{ color: 'cyan' }}>
											This fields below are required for signing in
											your account.NB:All fields should be entered
											here!!
										</h6>
										<div className="form-group">
											<input
												placeholder="Email"
												name="email"
												value={user.email}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
											<input
												placeholder="Username"
												name="username"
												value={user.username}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>{' '}
											{regerror && (
												<p
													style={{
														color: 'red',
														background: 'lightgrey',
														margin: '1rem auto 0 1rem',
														width: '80%',
													}}
												>
													{modalcontent}
												</p>
											)}
											<Button
												onClick={() =>
													email(
														auth_dispatch,
														auth_bs,
														user.email,
														user.username,
														regerror,
													)
												}
												variant="contained"
												className="bg-primary"
											>
												Next
											</Button>
										</div>
									</motion.div>
								)}
								{auth_bs && (
									<motion.div
										style={{ position: 'absolute !important' }}
										variants={variants}
										initial="initial"
										animate="animate"
									>
										<h6 style={{ color: 'magenta' }}>
											This fields below are Optional.
											<br />
											NB:Company Name field cannot be empty!!
										</h6>
										<div className="form-group">
											<input
												placeholder="Company Name"
												autoComplete="off"
												name="company"
												value={user.company}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
											<input
												placeholder="Company City/State(optional)"
												autoComplete="off"
												name="state"
												value={user.state}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>{' '}
											<select
												value={user.company_type}
												onChange={handleInput}
												name="company_type"
											>
												<option>Type of Company(optional)</option>
												<option value="Organisation">
													Organisation
												</option>
												<option value="Personal Company">
													Personal
												</option>
												<option value="institution">
													Instituition
												</option>
											</select>
											{regerror && (
												<p
													style={{
														color: 'red',
														background: 'lightgrey',
														margin: '1rem auto 0 1rem',
														width: '80%',
													}}
												>
													{modalcontent}
												</p>
											)}
											<Button
												onClick={() =>
													business(
														auth_dispatch,
														auth_info,
														user.company,

														regerror,
													)
												}
												variant="contained"
												className="bg-primary"
											>
												Next
											</Button>
										</div>
									</motion.div>
								)}
								{auth_info && (
									<motion.div
										style={{ position: 'absolute !important' }}
										variants={variants}
										initial="initial"
										animate="animate"
									>
										{' '}
										<h6 style={{ color: 'white' }}>
											These fields below are optional.
											<br />
											NB:For direct communication and update,atleast
											enter one.
										</h6>
										<div className="form-group">
											<input
												placeholder="Tel No 1"
												autoComplete="off"
												name="phone"
												value={user.phone}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
											<input
												placeholder="Tel No 2(optional)"
												autoComplete="off"
												name="phone1"
												value={user.phone1}
												onChange={handleInput}
												type="text"
												className="form-control"
											/>
											{regerror && (
												<p
													style={{
														color: 'red',
														background: 'lightgrey',
														margin: '1rem auto 0 1rem',
														maxWidth: '80%',
													}}
												>
													{modalcontent}
												</p>
											)}
											<Button
												onClick={() =>
													info(
														auth_dispatch,
														auth_password,
														user.phone,

														regerror,
													)
												}
												variant="contained"
												className="bg-primary"
											>
												Next
											</Button>
										</div>
									</motion.div>
								)}
								{auth_password && (
									<motion.div
										style={{ position: 'absolute !important' }}
										variants={variants}
										initial="initial"
										animate="animate"
									>
										<Box className="back_icon">
											<KeyboardBackspaceIcon
												onClick={() =>
													password(auth_dispatch, auth_name, regerror)
												}
												sx={{ fontSize: '1rem !important' }}
											/>
										</Box>
										<div className="form-group">
											<input
												placeholder="Password"
												autoComplete="off"
												name="password"
												value={user.password}
												onChange={handleInput}
												type={!passw ? 'password' : 'text'}
												style={{
													border: `${border_color} !important`,
												}}
												className="form-control"
												onKeyDown={handleStrength}
											/>
											<span
												style={{
													color: `${color} `,
												}}
											>
												{!error_reg ? passmessage : modalcontent}
											</span>
										</div>
										<div className="form-group">
											<Box className="d-flex align-items-center">
												{' '}
												<input
													placeholder="Confirm Password"
													autoComplete="off"
													name="confirmpassword"
													value={user.confirmpassword}
													onChange={handleInput}
													type={!passw ? 'password' : 'text'}
													className="form-control"
												/>
												{!passw ? (
													<VisibilityOn
														sx={{
															cursor: 'pointer',
															marginLeft: '.3rem',
														}}
														onClick={() => setPassw((prev) => !prev)}
													/>
												) : (
													<VisibilityOff
														sx={{
															cursor: 'pointer',
															marginLeft: '.3rem',
														}}
														onClick={() => setPassw((prev) => !prev)}
													/>
												)}
											</Box>
										</div>

										<Button
											variant="outlined"
											color="secondary"
											onClick={handleSubmit}
											type="submit"
										>
											{!loading ? (
												'Register'
											) : (
												<CircularProgress
													size="20px"
													sx={{ color: 'white', fontWeight: 'bold' }}
												/>
											)}{' '}
										</Button>
										<br />
										<Box className="d-flex flex-column foot">
											<span
												onClick={() => navigate('/login')}
												style={{
													cursor: 'pointer',
													color: 'greenyellow',
													marginBottom: '.5rem',
												}}
											>
												Already have Account?Sign in
											</span>
											<span
												onClick={() => navigate('/')}
												style={{
													cursor: 'pointer',
													color: 'violet',
												}}
											>
												Get Started-GameHubz
											</span>
										</Box>
									</motion.div>
								)}
							</form>
						</Box>
					)}
				</Box>
			</Stack>
		</Card>
	);
}
export default Register;
