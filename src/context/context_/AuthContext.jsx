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
		success_auth: false,
		error_auth: false,
		logged: false,
		isgenre: false,
		userInfo: '',
		profile: false,
		user: {},
		auth_name: false,
		auth_email: false,
		auth_info: false,
		auth_bs: false,
		auth_password: false,
		regerror: false,
		error_reg: false,
		message: '',
		error_email: false,
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
