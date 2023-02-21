import React, { useState, useCallback, useRef } from 'react';
import {
	Button,
	Box,
	Stack,
	Typography,
	TextField,
	IconButton,
} from '@mui/material';
import { useMainContext } from '../../context/context_/MainContext';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	Main,
	Left_Bar,
	Image_Data,
	MainStack,
	Profile_Data,
	Validate,
	Profile_Auth,
	Auth,
} from './styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../../assets/lohin.jpg';

import {
	update_user,
	delete_user,
	update_auth,
} from '../../context/features/user_actions';
import './profile.scss';
import Modal from './Modal';
import EditIcon from '@mui/icons-material/Edit';
import {
	useNavigate,
	useParams,
	Navigate,
	useLocation,
} from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
	WRONGPASSWORD,
	NO_DATA,
	SETPASSWORD,
	SETPASS,
	PERSONAL,
	AUTHENTICATE,
	COMPANY,
	CONTACT_INFO,
	MORE,
} from '../../context/types/action_type';
import { Form } from 'react-bootstrap';
const Profile = () => {
	const [image, setImage] = useState();

	const prevData = useRef({});
	const prevAuth = useRef({});
	const {
		main: {
			istheme,
			loading,
			ismodal,
			success,
			modalcontent,
			loader,
			disabled,
			personal,
			authenticate,
			company,
			contact,
			more_personal,
			showValidate,
			logged,
			error,
			email_disable,
		},
		setMainContext,
	} = useMainContext();

	const navigate = useNavigate();

	const [prof, setProf] = useState({
		firstname: '',
		lastname: ' ',
		username: '',
		email: '',
		marital: '',
		company: '',
		state: '',
		company_type: '',
		phone1: '',
		phone: '',
		occupation: '',
		city: '',
	});
	const [auth_data, setAuthData] = useState({
		oldpassword: '',
		password: '',
		confirmpassword: '',
	});
	const [new_user, setNewUser] = useState({
		newemail: '',
		newpass: '',
		newconfirmpass: '',
	});

	const [passw, setPassword] = useState(false);
	const [isDataChanged, setChanged] = useState(false);

	const handleChange = (ev) => {
		ev.preventDefault();
		// const fieldname = ev.target.getAttribute('name');
		// const fieldvalue = ev.target.value;
		// const newformData = { ...prof };
		// newformData[fieldname] = fieldvalue;

		setProf(() => {
			return { ...prof, [ev.target.name]: ev.target.value };
		});
		setAuthData(() => {
			return { ...auth_data, [ev.target.name]: ev.target.value };
		});

		setNewUser(() => {
			return { ...new_user, [ev.target.name]: ev.target.value };
		});
	};

	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const id = adm?.result?._id; // Update function
	const imageref = useRef();
	const handleImage = (e) => {
		{
			const file = e.target.files[0];
			Transformfile(file);
		}
	};
	const Transformfile = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = (e) => {
				console.log(e.target.result.replace(/(?:\r\n|\r|\n)/g, ''));
				setImage(reader.result.replace(/(?:\r\n|\r|\n)/g, ''));
			};
		} else {
			setImage('');
		}
	};
	const update_pass = useCallback(
		(ev) => {
			const myprofile = { prevAuth, userId: id };

			ev.preventDefault();

			update_auth(
				setMainContext,
				myprofile,
				id,
				setDisabled,
				auth_data,
			);
		},
		[setMainContext, id],
	);

	const update_acc = useCallback((ev) => {
		let form = { prevData, image };
		console.log(form.imageref);
		const myprofile = { form, userId: id };

		ev.preventDefault();
		if (
			prevData?.current?.firstname &&
			prevData?.current?.lastname &&
			prevData?.current?.company
		) {
			update_user(
				setMainContext,
				loading,
				myprofile,
				id,
				ismodal,
				success,
				navigate,
			);
		} else {
			setMainContext({ type: NO_DATA });
		}
	}, []);

	// Delete function

	const delete_acc = useCallback((ev) => {
		ev.preventDefault();

		const myprofile = {
			prevData,
			userId: id,
		};

		delete_user(
			setMainContext,
			loading,
			myprofile,
			id,
			ismodal,
			success,
			navigate,
			setDisabled,
		);
	}, []);
	const [allprof, setDataProfile] = useState({});
	const profile = useRef();

	// Get User Data
	const getUserData = async (ev) => {
		const baseUrl = 'https://gamebackend.onrender.com';

		try {
			const response = await axios.get(`${baseUrl}/user/v2/${id}`);

			setDataProfile(response?.data);

			setProf({
				firstname: response?.data?.firstname,
				lastname: response?.data?.lastname,
				username: response?.data?.username,
				email: response?.data?.email,
				company: response?.data?.company,
				company_type: response?.data?.company_type,
				state: response?.data?.state,
				phone: response?.data?.phone,
				phone1: response?.data?.phone1,
				marital: response?.data?.marital || '',
				occupation: response?.data?.occupation,
				city: response?.data?.city,
			});
		} catch (error) {
			if (error.message === 'Network Error') {
				setTimeout(() => {
					navigate('/erroroccurenceonpage/checkconnection');
				}, 10000);
			} else {
				console.log(error.message);
			}
		}
	};
	// Loader UseEffect
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 0 : prevProgress + 10,
			);
		}, 450);

		return () => {
			clearInterval(timer);
		};
	}, []);

	React.useEffect(() => {
		profile.current = allprof;
		prevData.current = prof;
		prevAuth.current = auth_data;
		imageref.current = image;
	}, [prof]);
	const closemodal = () => {
		setMainContext({ type: 'CLOSEMODAL', ismodal });
	};

	const [disable, setDisabled] = useState(false);
	const [new_account, setNewAccount] = useState(false);

	React.useEffect(() => {
		getUserData();
	}, [logged]);

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
	const [update_disabled, setUpdate_Disable] = useState(false);
	// React.useEffect(() => {
	// 	setUpdate_Disable(true);
	// }, [!personal, company, authenticate, !more_personal, contact]);
	return (
		<Stack
			sx={{
				background: 'white',
				minHeight: '100vh',
				width: '100%',
			}}
		>
			<MainStack className="profile">
				<Left_Bar className="profile_left">
					<Image_Data className="profile_image">
						<h4>Change Profile Picture</h4>

						<Box
							sx={{
								height: '20em',
								width: '100%',
								background: 'rgb(20, 22, 52)',
								marginBottom: '2.6rem',
							}}
							className="dp_picture"
						>
							{image ? <img src={image} /> : 'Profile picture here!!'}
							<span>
								<label htmlFor="dp_image">
									<AddAPhotoIcon
										sx={{
											color: 'white',
											fontSize: '2rem',
											cursor: 'pointer',
										}}
									/>
								</label>
							</span>
							<input
								id="dp_image"
								style={{
									display: 'none',
								}}
								onChange={handleImage}
								type="file"
							/>
						</Box>

						<Box
							sx={{
								color: 'lightgrey',
								padding: '.4rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<>
								<h6>
									Username:
									<span
										style={{
											color: 'lightgrey',
											opacity: '.6',
											fontSize: '1.2rem',
											position: 'absolute',
										}}
									>
										{prof?.username}
									</span>
								</h6>
								<p>
									{' '}
									Email:
									<span style={{ color: 'lightgrey', opacity: '.6' }}>
										{' '}
										{adm?.result?.email}
									</span>
								</p>
								<p>
									N/B: A User can Only update their data/information
									only.
								</p>
								<p>
									N/B: An Admin on the Other hand can only delete or
									terminate a user anytime but they cannot edit or
									change any of the user's data.
								</p>
								<Stack
									direction="row"
									sx={{
										padding: '.4rem',
										background: 'maroon',
										width: '50%',
										cursor: 'pointer',
									}}
									onClick={() => {
										navigate('/');
										window.location.reload();
									}}
								>
									{' '}
									<ArrowBackIcon />
									Go Back
								</Stack>
							</>
						</Box>
					</Image_Data>
				</Left_Bar>
				<Main istheme={istheme}>
					{ismodal && (
						<Modal
							error={error}
							success={success}
							closemodal={closemodal}
							modalcontent={modalcontent}
							marginTop="20rem"
							marginLeft="5rem"
							width="80%"
						/>
					)}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								color: 'red',
								fontSize: '1.3rem !important',
								marginLeft: '1rem',
								marginTop: '.5rem !important',
							}}
							className="head__update"
						>
							Update Info
						</Typography>
					</Box>

					<Box
						className="container-fluid"
						sx={{
							marginTop: '.9rem',
							borderLeft: '1px solid lightgrey',
							height: '73vh',
							paddingTop: '.2rem',
							background: istheme ? 'white' : 'black',
						}}
					>
						<Box className=" box_input">
							<h6 style={{ color: 'red' }}>Personal</h6>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: personal
											? '1.5px solid grey !important'
											: 'none',
										color: personal ? 'purple' : 'grey',
									}}
									disabled={!personal}
									className=""
									placeholder="Firstname"
									name="firstname"
									value={prof?.firstname || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: personal
											? '1.5px solid grey'
											: 'none',
										color: personal ? 'purple' : 'grey',
									}}
									disabled={!personal}
									className=" mb-3"
									placeholder="Lastname"
									name="lastname"
									value={prof?.lastname || ''}
									onChange={handleChange}
									type="text"
								/>
								<span
									className="edit "
									onClick={() =>
										setMainContext({ type: PERSONAL, personal })
									}
								>
									{!personal ? 'Edit' : 'hide'}
								</span>
							</Profile_Data>
						</Box>
						<Box className=" box_input">
							<h6 style={{ color: 'red' }}>Authentication</h6>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: authenticate
											? '1.5px solid grey'
											: 'none',
										color: authenticate ? 'purple' : 'grey',
									}}
									disabled={!authenticate}
									className=""
									placeholder="Username"
									name="username"
									value={prof?.username || ''}
									onChange={handleChange}
									type="text"
								/>
							</Profile_Data>
							<Profile_Data className="form-group">
								<input
									disabled={!email_disable}
									name="email"
									className=" mb-4"
									placeholder="Email Address"
									value={prof?.email || ''}
									type="text"
								/>{' '}
								<span
									className="edit "
									onClick={() =>
										setMainContext({
											type: AUTHENTICATE,
											authenticate,
										})
									}
								>
									{!authenticate ? 'Edit' : 'hide'}
								</span>
								<p
									className=" pass"
									onClick={() => {
										setMainContext({
											type: SETPASSWORD,
											showValidate,
										});
									}}
								>
									Change Password
								</p>
							</Profile_Data>
						</Box>
						<Box className=" box_input">
							<h6 style={{ color: 'red' }}>Company Data</h6>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: company
											? '1.5px solid grey'
											: 'none',
										color: company ? 'purple' : 'grey',
									}}
									disabled={!company}
									className=""
									name="company"
									placeholder="Company Name"
									value={prof?.company || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>
							<Profile_Data>
								<input
									style={{
										borderBottom: company
											? '1.5px solid grey'
											: 'none',
										color: company ? 'purple' : 'grey',
									}}
									disabled={!company}
									className=""
									name="company_type"
									placeholder="Company Type"
									value={prof?.company_type || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>{' '}
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: company
											? '1.5px solid grey'
											: 'none',
										color: company ? 'purple' : 'grey',
									}}
									disabled={!company}
									className=" mb-3"
									name="state"
									placeholder="Company Location(City/State)"
									value={prof?.state || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
								<span
									className="edit "
									onClick={() =>
										setMainContext({ type: COMPANY, company })
									}
								>
									{!company ? 'Edit' : 'hide'}
								</span>
							</Profile_Data>
						</Box>
						<Box className=" box_input">
							<h6 style={{ color: 'red' }}>Contact Info</h6>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: contact
											? '1.5px solid grey'
											: 'none',
										color: contact ? 'purple' : 'grey',
									}}
									disabled={!contact}
									className=""
									name="phone"
									placeholder="Tel No 1"
									value={prof?.phone || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: contact
											? '1.5px solid grey'
											: 'none',
									}}
									disabled={!contact}
									className=" mb-3"
									name="phone1"
									placeholder="Tel No 2"
									value={prof?.phone1 || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
								<span
									className="edit "
									onClick={() =>
										setMainContext({ type: CONTACT_INFO, contact })
									}
								>
									{!contact ? 'Edit' : 'hide'}
								</span>
							</Profile_Data>
						</Box>
						<Box className=" box_input">
							<h6 style={{ color: 'red' }}>More Personal Info</h6>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: more_personal
											? '1.5px solid grey'
											: 'none',
										color: personal ? 'purple' : 'greenyellow',
										color: more_personal ? 'purple' : 'grey',
									}}
									disabled={!more_personal}
									className=""
									name="marital"
									placeholder="Marital Status"
									value={prof?.marital || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>
							<Profile_Data className="form-group">
								<input
									style={{
										borderBottom: more_personal
											? '1.5px solid grey'
											: 'none',
									}}
									disabled={!more_personal}
									className=""
									name="occupation"
									placeholder="Occupation"
									value={prof?.occupation || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
							</Profile_Data>

							<Profile_Data className="form-group">
								<input
									disabled={!more_personal}
									className=" mb-3"
									name="city"
									placeholder="City/State"
									value={prof?.city || ''}
									onChange={handleChange}
									type="text"
								/>{' '}
								<span
									className="edit "
									onClick={() =>
										setMainContext({ type: MORE, more_personal })
									}
								>
									{!more_personal ? 'Edit' : 'hide'}
								</span>
							</Profile_Data>
						</Box>

						<Validate showValidate={showValidate}>
							{showValidate && (
								<Auth>
									{' '}
									<div className="top">
										<span
											onClick={() => {
												setNewAccount((prev) => !prev);
											}}
											className="back_icon"
										>
											<KeyboardBackspaceIcon />
										</span>
										<span
											onClick={() =>
												setMainContext({
													type: SETPASS,
													showValidate,
												})
											}
											className="close_icon"
										>
											{' '}
											&times;
										</span>
									</div>
									{!new_account ? (
										<>
											<Box className="account">
												<h6>{adm?.result?.email}</h6>
											</Box>

											<motion.div
												variants={variants}
												initial="initial"
												animate="animate"
												className="auth"
											>
												<Profile_Auth success={success} error={error}>
													<TextField
														InputLabelProps={{
															shrink: true,
															style: {
																color: istheme ? 'grey' : 'grey',
																marginLeft: '.5rem',
															},
														}}
														name="oldpassword"
														labelid="demo-simple-select-standard-label"
														id="demo-simple-select-standard"
														variant="standard"
														label="Old Password"
														type={!passw ? 'password' : 'text'}
														sx={{
															color: 'white',
															width: '100%',
															borderLeft: !istheme
																? '2px solid grey'
																: 'none',
															borderBottom: '1px solid lightgrey',
														}}
														inputProps={{
															style: {
																marginLeft: '.5rem',
																color: disabled
																	? 'black'
																	: 'rgb(201, 175, 175)',
															},
														}}
														value={auth_data?.oldpassword || ''}
														onChange={handleChange}
													/>
												</Profile_Auth>
												<Profile_Auth success={success} error={error}>
													<Box
														style={{
															display: 'flex',
															width: '100%',

															alignItems: 'center',
														}}
													>
														<TextField
															InputLabelProps={{
																shrink: true,
																style: {
																	color: istheme ? 'grey' : 'grey',
																	marginLeft: '.5rem',
																},
															}}
															name="password"
															labelid="demo-simple-select-standard-label"
															id="demo-simple-select-standard"
															variant="standard"
															label="New Password"
															type={!passw ? 'password' : 'text'}
															sx={{
																color: 'white',
																width: '100%',
																borderLeft: !istheme
																	? '2px solid grey'
																	: 'none',
																borderBottom: '1px solid lightgrey',
															}}
															inputProps={{
																style: {
																	marginLeft: '.5rem',
																	color: disabled
																		? 'black'
																		: 'rgb(201, 175, 175)',
																},
															}}
															value={auth_data?.password || ''}
															onChange={handleChange}
														/>
														{!passw ? (
															<VisibilityOff
																sx={{
																	cursor: 'pointer',
																	color: !istheme ? 'black' : 'black',
																	marginLeft: '.6rem',
																}}
																onClick={() => {
																	setPassword((prof) => !prof);
																}}
															/>
														) : (
															<VisibilityOn
																sx={{
																	cursor: 'pointer',
																	color: !istheme ? 'black' : 'black',
																}}
																onClick={() => {
																	setPassword((prof) => !prof);
																}}
															/>
														)}
													</Box>
												</Profile_Auth>

												<Profile_Auth success={success} error={error}>
													<TextField
														InputLabelProps={{
															shrink: true,
															style: {
																color: istheme ? 'grey' : 'grey',
																marginLeft: '.5rem',
															},
														}}
														type={!passw ? 'password' : 'text'}
														name="confirmpassword"
														labelid="demo-simple-select-standard-label"
														id="demo-simple-select-standard"
														variant="standard"
														label="Confirm New Password"
														sx={{
															color: 'white',
															width: '100%',
															borderLeft: !istheme
																? '2px solid grey'
																: 'none',
															borderBottom: '1px solid lightgrey',
														}}
														inputProps={{
															style: {
																marginLeft: '.5rem',
																color: disabled
																	? 'black'
																	: 'rgb(201, 175, 175)',
															},
														}}
														value={auth_data?.confirmpassword || ''}
														onChange={handleChange}
													/>
												</Profile_Auth>
												<Box>
													{error && (
														<span
															style={{
																color: 'red',
																margin: '3rem 0 0 1rem',
																fontSize: '.8rem',
															}}
														>
															{modalcontent}
														</span>
													)}
													{success && (
														<span
															style={{
																color: 'green',
																margin: '2rem 0 0 3rem',
																fontSize: '.8rem',
															}}
														>
															{modalcontent}
														</span>
													)}
												</Box>
												<Box>
													<Button
														disabled={loading}
														onClick={update_pass}
														variant="outlined"
														sx={{
															background: 'orange !important',
															marginRight: '1rem',
															color: 'black',
														}}
													>
														{loading ? (
															<>
																<CircularProgress
																	value={progress}
																	size="27px"
																	sx={{ marginRight: '.6rem' }}
																/>

																<span>Updating...</span>
															</>
														) : (
															<span style={{ color: 'indigo' }}>
																Update Password
															</span>
														)}
													</Button>
												</Box>
												<Box
													className="add_button"
													onClick={() =>
														setNewAccount((prev) => !prev)
													}
												>
													{' '}
													<Button variant="outlined">
														Add another account
														<span>
															<AddIcon />
														</span>
													</Button>
												</Box>
											</motion.div>
										</>
									) : (
										<motion.div
											variants={variants}
											initial="initial"
											animate="animate"
											className="new_account"
										>
											<input
												value={new_user?.newemail || ''}
												onChange={handleChange}
												name="newemail"
												type="email"
												placeholder="New Email"
											/>
											<input
												value={new_user?.newpass || ''}
												name="newpass"
												onChange={handleChange}
												type="text"
												placeholder="Password"
											/>
											<input
												value={new_user?.newconfirm || ''}
												name="newconfirm"
												onChange={handleChange}
												type="text"
												placeholder="Confirm password"
											/>
											<Button variant="outlined" color="info">
												Create Account
											</Button>
										</motion.div>
									)}
								</Auth>
							)}
						</Validate>

						{!showValidate ? (
							<Box
								sx={{
									marginTop: '2rem',
								}}
								className="actions"
							>
								{!update_disabled && (
									<Button
										disabled={loading}
										onClick={update_acc}
										variant="outlined"
										sx={{
											background: 'lightblue',
											marginRight: '1rem',
											color: 'green',
										}}
									>
										{loading ? (
											<>
												{' '}
												<CircularProgress
													value={progress}
													size="27px"
													sx={{ color: 'secondary', width: '10%' }}
												/>{' '}
												<span
													style={{
														textTransform: 'none',
														marginLeft: '.7rem',
														fontWeight: 'bold',
													}}
												>
													Updating...
												</span>
											</>
										) : (
											<span
												style={{
													textTransform: 'none',
													marginLeft: '.7rem',
													fontWeight: 'bold',
												}}
											>
												Update data
											</span>
										)}
									</Button>
								)}

								<Button
									onClick={delete_acc}
									variant="contained"
									sx={{ background: 'red' }}
								>
									{loader ? (
										<CircularProgress
											size="20px"
											sx={{ color: 'white' }}
										/>
									) : (
										<span
											style={{
												textTransform: 'none',
												marginLeft: '.7rem',
												fontWeight: 'bold',
											}}
										>
											Delete Account
										</span>
									)}
								</Button>
							</Box>
						) : (
							''
						)}
					</Box>
				</Main>
			</MainStack>
		</Stack>
	);
};

export default Profile;

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant="determinate" {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
				>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};
