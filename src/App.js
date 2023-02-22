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
} from './pages';

import PrivateRoutes from './components/PrivateRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Score from './components/Fifa/game_data/fifa_categories/Score';
import Priv_Admin from './components/Priv_Admin';
import { JWT } from './context/types/action_type';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Network from './pages/Network';
import LiveScores from './pages/live/LiveScores';

function App() {
	const nav = useNavigate();
	const {
		auth_state: { user },
		auth_dispatch,
	} = useAuthContext();

	const mydata = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if (!mydata) {
			nav('/login');
		}
	}, []);
	const {
		main: { overlay, logged, prof_data },
		setMainContext,
	} = useMainContext();
	const [child_userdata, setChildUser] = useState('');
	const spinner = document.getElementById('spinner');

	// const myLoader = () => {
	// 	if (spinner) {
	// 		setTimeout(() => {
	// 			spinner.style.display = 'none';
	// 			setLoader(false);
	// 		}, 2000);
	// 	}
	// };

	//

	const getChildUser = (childData) => {
		return setChildUser(childData);
	};

	const Profile = lazy(() => import('./pages/profile/Profile'));
	const Header = lazy(() => import('./components/Header'));
	const Standings = lazy(() => import('./pages/Standings'));
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<Suspense>
				<Box className="layout_header_container">
					<Header />
				</Box>
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
						</Route>
					</Routes>
				</Layout>
			</Suspense>
		</QueryClientProvider>
	);
}

export default App;
