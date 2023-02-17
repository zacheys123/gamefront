import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';

import { setUser } from './redux/features/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './App.css';

import { useMainContext } from './context/context_/MainContext';
import { useAuthContext } from './context/context_/AuthContext';
import {
	Login,
	Standings,
	Register,
	Game,
	PackagePlan,
	AllGames,
	NoPage,
	Home,
} from './pages';

import PrivateRoutes from './components/PrivateRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Score from './components/Fifa/game_data/fifa_categories/Score';
import Profile from './pages/profile/Profile';
import Priv_Admin from './components/Priv_Admin';
import { LineAxisOutlined } from '@mui/icons-material';
import LandingPage from './pages/LandingPage';
import { JWT } from './context/types/action_type';
import axios from 'axios';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Layout } from './components';
import Network from './pages/Network';

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

	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<Layout className="App" style={{ position: 'relative' }}>
				<hr style={{ width: '95%', margin: 'auto' }} />
				<ToastContainer />
				<Routes>
					<Route exact path="/summary" element={<AllGames />} />
					<Route
						exact
						path="/standings"
						element={
							<PrivateRoutes>
								<Standings />
							</PrivateRoutes>
						}
					/>
					<Route
						exact
						path="/game"
						element={<Game child_userdata={child_userdata} />}
					/>
					<Route
						exact
						path="/v2/:id"
						element={<Profile child_userdata={child_userdata} />}
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
					<Route path="network" element={<Network />} />
					<Route exact path="/new/game" element={<Score />} />
					<Route
						exact
						path="/"
						element={<Home getData={getChildUser} />}
					/>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route
						exact
						path="/v2/package-plan"
						element={<PackagePlan child_userdata={child_userdata} />}
					/>
				</Routes>
			</Layout>
		</QueryClientProvider>
	);
}

export default App;
