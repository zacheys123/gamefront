import { useState, useCallback, useRef, useEffect } from 'react';
import { Stack, Box, Button } from '@mui/material';
import '../css/auth.scss';

import { useAdminContext } from '../context/context_/AdminContext';
import { Form } from 'react-bootstrap';
import { adminLogin } from '../context/features/adminLogin';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
	const {
		admin_state: { loading, iserror, issuccess, error, success },
		admin_dispatch,
	} = useAdminContext();

	const [adm_log, setadmlog] = useState(() => {
		const storedvalues = JSON.parse(
			localStorage.getItem('admin_log'),
		);
		if (!storedvalues) {
			return '63e0e63a0e29bee00f60ddf6';
		} else {
			return storedvalues?.result?._id;
		}
	});
	const [adm, setadm] = useState(() => {
		const storedvalues = JSON.parse(localStorage.getItem('profile'));
		if (!storedvalues) {
			return '63e0e63a0e29bee00f60ddf6';
		} else {
			return storedvalues?.result?._id;
		}
	});
	const navigate = useNavigate();
	const adminref = useRef();
	const [admin, setAdmin] = useState({
		username: '',
		secret_question: '',
		secret: '',
	});
	const handleAdmin = (ev) => {
		setAdmin({ ...admin, [ev.target.name]: ev.target.value });
	};
	const admindata = { adm, adminref };
	const login = useCallback((ev) => {
		ev.preventDefault();
		adminLogin(admindata, admin_dispatch, adm, navigate, loading);
	}, []);
	useEffect(() => {
		adminref.current = admin;
	}, []);
	return (
		<Box className="admin__log">
			<div className="form__class">
				{' '}
				<Form className="form-group ">
					<div className="form-inputs">
						<input
							type="text"
							name="username"
							placeholder="username"
							value={admin.username}
							onChange={handleAdmin}
						/>
					</div>
					<div className="form-inputs">
						<select
							name="secret_question"
							value={admin.secret_question}
							onChange={handleAdmin}
							type="text"
						>
							<option value="pet">
								What's the name of your pet?
							</option>
							<option value="teacher">
								Who was your kindergaten teacher?
							</option>
							<option value="family">
								Who do You love more in your family?
							</option>
							<option value="car">What's your dream car?</option>
						</select>
					</div>
					<div className="form-inputs">
						<input
							placeholder="Answer secret"
							autoComplete="off"
							name="secret"
							value={admin.secret}
							onChange={handleAdmin}
							type="text"
						/>
					</div>
					{iserror && (
						<p
							style={{
								color: 'orangered',
								fontWeight: 'bold',

								margin: '1rem auto 0 1rem',
								maxWidth: '80%',
							}}
						>
							{error}
						</p>
					)}
					{issuccess && (
						<p
							style={{
								color: 'orangered',
								fontWeight: 'bold',

								margin: '1rem auto 0 1rem',
								maxWidth: '80%',
							}}
						>
							{success}
						</p>
					)}
					<div className="d-flex justify-content-between align-items-centers">
						<Button
							onClick={login}
							variant="contained"
							className="bg-primary"
						>
							Login
						</Button>
						<Button
							onClick={() => navigate('/')}
							variant="contained"
							className="bg-primary"
						>
							Home
						</Button>
					</div>
				</Form>
			</div>
		</Box>
	);
};

export default Admin;
