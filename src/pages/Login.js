import { useState, useRef, useEffect, useCallback } from 'react';
import {
	Stack,
	Box,
	Card,
	Button,
	Container,
	CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../context/features/admin';
import { useAuthContext } from '../context/context_/AuthContext';
import Modal from './profile/Modal';
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../css/auth.scss';
import profile from '../assets/profile.png';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Login(props) {
	const {
		auth_state: { ismodal, modalcontent, loading, success, error },
		auth_dispatch,
	} = useAuthContext();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [passw, setPassw] = useState(false);
	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setUser({ ...user, [name]: value });
	};
	const userdata = useRef();
	const navigate = useNavigate();
	const handleLogin = useCallback(
		(ev) => {
			ev.preventDefault();
			if (userdata?.current?.email && userdata?.current?.password) {
				if (
					userdata?.current?.email.length > 6 &&
					userdata?.current?.password.length > 6
				) {
					adminLogin(navigate, auth_dispatch, loading, userdata);
				} else {
					auth_dispatch({
						type: 'PASSWORDLENGTH',
						modalcontent:
							' Password should be at least 6 characters long',
					});
				}
			} else {
				auth_dispatch({
					type: 'EMPTY',
					modalcontent: 'Cannot submit empty inputs',
				});
			}
		},
		[userdata?.current?.email, userdata?.current?.password],
	);
	const closemodal = () => {
		auth_dispatch({ type: 'CLOSEMODAL' });
	};
	useEffect(() => {
		userdata.current = user;
	}, [user]);
	const variants = {
		initial: {
			x: '400px',
			opacity: 0,
		},
		// animate: {
		// 	x: ['100%', '0%', '-5%', '0%'],
		// 	opacity: 1,
		// 	transition: {
		// 		delay: 0.5,
		// 		duration: 0.6,
		// 	},
		// },
	};
	return (
		<Card
			className="auth_page"
			style={{ height: props.height || '' }}
		>
			<motion.div
				className="form__login"
				variant={variants}
				initial="initial"
				animate="animate"
			>
				{ismodal && (
					<Modal
						closemodal={closemodal}
						modalcontent={modalcontent}
						success={success}
						error={error}
					/>
				)}

				<Box className="profile__pic">
					<AccountCircleIcon sx={{ fontSize: '7rem' }} />
				</Box>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label htmlFor="username">Email or Username</label>
						<div className="input">
							<Person sx={{ fontSize: '1.9rem' }} />
							<div
								style={{
									height: '1.2rem',
									marginLeft: '.5rem',
									border: '1px solid rgb(104, 96, 96)',
								}}
							></div>
							<input
								name="email"
								value={user.email}
								onChange={handleInput}
								type="text"
							/>
						</div>
					</div>
					<div className="form-group w-100">
						<label htmlFor="username">Password</label>
						<Box className="d-flex align-items-center input">
							<Lock sx={{ fontSize: '1.8rem' }} />
							<div
								style={{
									height: '1.2rem',
									marginLeft: '.5rem',
									border: '1px solid rgb(104, 96, 146)',
									opacity: '.6',
								}}
							></div>
							<input
								name="password"
								value={user.password}
								onChange={handleInput}
								type={!passw ? 'password' : 'text'}
							/>
						</Box>
					</div>
					<Box className="more_auth">
						<div
							className="d-flex align-items-center ms-3 mt-4
					"
						>
							<input
								type="checkbox"
								style={{
									width: '1.2rem',
									height: '1.5rem',
									margin: '-.9rem .6rem 0 0',
								}}
							/>
							<p>Show Password</p>
						</div>
						<div className="d-flex align-items-center  ms-3 mt-1">
							<input
								type="checkbox"
								style={{
									width: '1.2rem',
									height: '1.5rem',
									margin: '-.9rem .6rem 0 0',
								}}
							/>
							<p>Remember me</p>
						</div>
						<div className="d-flex justify-content-around">
							<h6
								className="text-info "
								style={{ cursor: 'pointer' }}
								onClick={() => navigate('/register')}
							>
								Register?
							</h6>
							<h6
								className="text-primary"
								style={{ cursor: 'pointer' }}
								onClick={() => navigate('/reset')}
							>
								Forgot Password?
							</h6>
						</div>
					</Box>

					<Button
						variant="outlined"
						className="login"
						color="secondary"
						type="submit"
					>
						{!loading ? (
							'Login'
						) : (
							<CircularProgress
								size="20px"
								sx={{ color: 'white', fontWeight: 'bold' }}
							/>
						)}{' '}
					</Button>
					<br />
				</form>
			</motion.div>
		</Card>
	);
}
export default Login;
