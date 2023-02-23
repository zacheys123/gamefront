import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainContext from './context/context_/MainContext';
import GameContext from './context/context_/GameContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/context_/AuthContext';
import AdminContext from './context/context_/AdminContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<MainContext>
					<GameContext>
						<AuthContext>
							<AdminContext>
								{' '}
								<App />
							</AdminContext>{' '}
						</AuthContext>
					</GameContext>
				</MainContext>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
