import { useContext, useReducer } from 'react';
import { AdminProvider } from '../config';

import {
	admin_redux,
	admin_Initialstate,
} from '../reducers/admin_reducers';
function AdminContext({ children }) {
	const [admin_state, admin_dispatch] = useReducer(
		admin_redux,
		admin_Initialstate,
	);
	let value = {
		admin_state,
		admin_dispatch,
	};
	return (
		<AdminProvider.Provider value={value}>
			{children}
		</AdminProvider.Provider>
	);
}

export default AdminContext;
export const useAdminContext = () => {
	const context = useContext(AdminProvider);
	if (!context) {
		throw new Error('UseAuthContext can only be used in children');
	}
	return context;
};
