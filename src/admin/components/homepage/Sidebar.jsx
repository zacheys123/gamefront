import { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import {
	Dashboard,
	Settings,
	Home,
	Person,
	AccountBox,
	Logout,
	BarChart,
	Notifications,
	LocalHospital,
	Edit,
	PersonAddAlt,
	AdminPanelSettings,
} from '@mui/icons-material';
import { NAVS } from './style';
import { useAdminContext } from '../../../context/context_/AdminContext';
import './Sidebar.scss';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
	const {
		admin_state: { istheme, disable, logged },
		admin_dispatch,
	} = useAdminContext();
	const navigate = useNavigate();
	const logout = () => {
		// 	admin_dispatch({ type: 'LOGOUT', payload: { admin: null } });
		// 	window.localStorage.removeItem('profile');
		// 		window.localStorage.removeItem('profile');
		// 	navigate('/login');
	};
	const logref = useRef();
	useEffect(() => {
		if (logged) {
			logref.current.style.display = 'none';
		}
	}, [logged]);
	const admin = JSON.parse(localStorage.getItem('admin_log'));
	let admin_id = admin?.result?._id;
	return (
		<Container className={!istheme ? 'sidebar' : 'darktheme'}>
			<Box className="sidebar__page">
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						MAIN
					</p>
					<Box className="sidebar__nav">
						<Dashboard
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/admin-panel`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Dashboard
								</Typography>
							</div>
						</NAVS>
					</Box>
				</Box>
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						FEED
					</p>
					<Box className="sidebar__nav">
						<Home
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link
								to="/admin/v1/:id/feed"
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Feed
								</Typography>
							</Link>
						</NAVS>
					</Box>
				</Box>
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						LISTS
					</p>
					<Box className="sidebar__nav">
						<Person
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link to="/users" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Games
								</Typography>
							</Link>
						</NAVS>
					</Box>
					<Box className="sidebar__nav">
						<PersonAddAlt
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link to="users/new" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Tournaments
								</Typography>
							</Link>
						</NAVS>
					</Box>
					<Box className="sidebar__nav">
						<Edit
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link
								to="users/a user id is here"
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Upgrade Plan
								</Typography>
							</Link>
						</NAVS>
					</Box>
				</Box>

				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						Admin
					</p>
					<Box className="sidebar__nav">
						<AccountBox
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link
								to="admin/profile/an admin id is here"
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Profile
								</Typography>
							</Link>
						</NAVS>
					</Box>
					<Box className="sidebar__nav">
						<PersonAddAlt
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id} logged={logged}>
							<Link to="admin/new" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									New Admin
								</Typography>
							</Link>
						</NAVS>
					</Box>
				</Box>
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						USEFUL
					</p>
					<Box className="sidebar__nav">
						<BarChart
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link to="admin/stats" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Stats
								</Typography>
							</Link>
						</NAVS>
					</Box>
					<Box className="sidebar__nav">
						<Notifications
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link to="admin/new" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Notifications
								</Typography>
							</Link>
						</NAVS>
					</Box>
				</Box>
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						Service
					</p>
					<Box className="sidebar__nav">
						<LocalHospital
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link
								to="admin/profile/an admin id is here"
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Sys Health
								</Typography>
							</Link>
						</NAVS>
					</Box>
					<Box className="sidebar__nav">
						<Settings
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<Link to="admin/new" className="sidebar__links">
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Settings
								</Typography>
							</Link>
						</NAVS>
					</Box>
				</Box>
				<Box className="Links">
					<p className={!istheme ? 'text-muted' : 'text-danger'}>
						USER
					</p>

					<Box className="sidebar__nav">
						<Logout
							sx={{
								color: !istheme ? 'purple' : 'lightblue',
								fontSize: '1.2rem',
							}}
						/>
						<NAVS auth={!admin?.result?._id}>
							<strong
								onClick={logout}
								className="sidebar__links"
								style={{ cursor: 'pointer' }}
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Logout
								</Typography>
							</strong>
						</NAVS>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
export default Sidebar;
