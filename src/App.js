import { useEffect, useState, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import { setUser } from './redux/features/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './App.css';

import { useMainContext } from './context/context_/MainContext';
import { useAuthContext } from './context/context_/AuthContext';
import {
	Login,
	Register,
	PackagePlan,
	AllGames,
	NoPage,
	Game,
	Home,
	Standings,
} from './pages';

import PrivateRoutes from './components/PrivateRoutes';
import Profile from './pages/profile/Profile';
import Footer from './components/Footer';
import Score from './components/Fifa/game_data/fifa_categories/Score';
import Priv_Admin from './components/Priv_Admin';
import { Admin, Dashboard, Feed } from './admin';
import { JWT } from './context/types/action_type';
import Admin_Layout from './admin/components/layout/Admin_Layout';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Layout } from './components';
import Network from './pages/Network';
import LiveScores from './pages/live/LiveScores';
import Games_Summary from './admin/Games_Summary';
import Tournament from './admin/Tournament';

function App() {
	const nav = useNavigate();
	const {
		auth_state: { user },
		auth_dispatch,
	} = useAuthContext();

	const mydata = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if (!mydata) {
			myLoader();
			nav('/login');
		}
	}, [mydata]);
	const {
		main: { overlay, logged, prof_data },
		setMainContext,
	} = useMainContext();
	const [child_userdata, setChildUser] = useState('');
	const [loader, setLoader] = useState(false);
	const spinner = document.getElementById('spinner');

	const myLoader = () => {
		if (spinner) {
			setTimeout(() => {
				spinner.style.display = 'none';
				setLoader(false);
			}, 5000);
		}
	};

	const getChildUser = (childData) => {
		return setChildUser(childData);
	};
	useEffect(() => {
		myLoader();
	}, [loader]);

	const client = new QueryClient();
	return (
		<>
			{!loader && (
				<QueryClientProvider client={client}>
					<Layout className="App" style={{ position: 'relative' }}>
						<hr style={{ width: '95%', margin: 'auto' }} />
						<ToastContainer />
						<Routes>
							<Route exact path="/">
								<Route path="/summary" element={<AllGames />} />
								<Route
									path="/standings"
									element={
										<PrivateRoutes>
											<Standings />
										</PrivateRoutes>
									}
								/>
								<Route
									path="/game"
									element={
										<PrivateRoutes>
											<Game child_userdata={child_userdata} />
										</PrivateRoutes>
									}
								/>
								<Route
									path="/v2/:id"
									element={
										<PrivateRoutes>
											<Profile child_userdata={child_userdata} />
										</PrivateRoutes>
									}
								/>
								<Route
									path="*"
									element={
										<PrivateRoutes>
											{' '}
											<NoPage />
										</PrivateRoutes>
									}
								/>{' '}
								<Route
									path="network"
									element={
										<PrivateRoutes>
											<Network />
										</PrivateRoutes>
									}
								/>
								<Route path="/new/game" element={<Score />} />
								<Route
									index
									element={
										<PrivateRoutes>
											<Home getData={getChildUser} />
										</PrivateRoutes>
									}
								/>
								<Route
									path="/:id/v2/livescore"
									element={
										<PrivateRoutes>
											<LiveScores />
										</PrivateRoutes>
									}
								/>
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route
									path="/v2/package-plan"
									element={
										<PrivateRoutes>
											<PackagePlan child_userdata={child_userdata} />
										</PrivateRoutes>
									}
								/>
								<Route exact path="admin">
									<Route path="v1/:id/login" element={<Admin />} />
									<Route
										path="v1/:id/admin-panel"
										element={
											<Priv_Admin>
												<Admin_Layout>
													<Dashboard />
												</Admin_Layout>
											</Priv_Admin>
										}
									/>
									<Route
										path="v1/:id/feed"
										element={
											<Priv_Admin>
												{' '}
												<Admin_Layout>
													<Feed />
												</Admin_Layout>
											</Priv_Admin>
										}
									/>
									<Route
										path="v1/:id/games_summary"
										element={
											<Priv_Admin>
												{' '}
												<Admin_Layout>
													<Games_Summary />
												</Admin_Layout>
											</Priv_Admin>
										}
									/>
									<Route
										path="v1/:id/tournament"
										element={
											<Priv_Admin>
												{' '}
												<Admin_Layout>
													<Tournament />
												</Admin_Layout>
											</Priv_Admin>
										}
									/>
								</Route>
							</Route>
						</Routes>
					</Layout>
				</QueryClientProvider>
			)}
		</>
	);
}

export default App;
