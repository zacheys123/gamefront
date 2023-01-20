import { useContext, useReducer } from 'react';
import { AuthProvider } from '../config';
import { main_redux } from '../reducers/main';
function AuthContext({ children }) {
	const initialState = {
		istheme: false,
		ismodal: false,
		modalcontent: '',
		loading: false,
		disable: false,
		success: false,
		error: false,
		logged: false,
		isgenre: false,
		userInfo: '',
		profile: false,
		user: {},
	};
	const [auth_state, auth_dispatch] = useReducer(
		main_redux,
		initialState,
	);
	let value = { auth_state, auth_dispatch };
	return (
		<AuthProvider.Provider value={value}>
			{children}
		</AuthProvider.Provider>
	);
}

export default AuthContext;
export const useAuthContext = () => {
	const context = useContext(AuthProvider);
	if (!context) {
		throw new Error('UseAuthContext can only be used in children');
	}
	return context;
};
