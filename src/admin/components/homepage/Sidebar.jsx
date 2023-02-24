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
	const admin = JSON.parse(localStorage.getItem('admin_log'));
	let admin_id = admin?.result?._id;
	const navigate = useNavigate();
	const logout = () => {
		window.localStorage.removeItem('admin_log');
		navigate(`/admin/v1/${admin_id}/login`);
	};
	const logref = useRef();
	useEffect(() => {
		if (logged) {
			logref.current.style.display = 'none';
		}
	}, [logged]);

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
							<div
								onClick={() => navigate(`/admin/v1/${admin_id}/feed`)}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Feed
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/games_summary`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Games
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Tournaments
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Upgrade Plan
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Profile
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									New Admin
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Stats
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Notifications
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Sys Health
								</Typography>
							</div>
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
							<div
								onClick={() =>
									navigate(`/admin/v1/${admin_id}/tournament`)
								}
								className="sidebar__links"
							>
								<Typography
									className={!istheme ? 'title' : 'text-light'}
									variant="subtitle"
								>
									Settings
								</Typography>
							</div>
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
