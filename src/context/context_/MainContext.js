import React, { useContext, createContext, useReducer } from 'react';

import { mainreducer } from '../reducers/mainreducer';

const initialState = {
	authorize: false,
	auth: false,
	istheme: false,
	currentuser: { email: '' },
	loading: false,
	modalsuccess: null,
	ismodal: false,
	contact: false,
	descr: false,
	data_feed: {},
	iserror: false,
	error: '',
	success: false,
	successmessage: 'Welcome to Gamehub ',
	modalcontent: '',
	currentUser: '',
	updated_user: {},
	loader: false,
	disabled: false,
	overlay: false,
	isplan: false,
	mymess: '',
	userInfo: '',
	free: false,
	amateur: false,
	world: false,
	premium: false,
	showmenu: false,
	prof_data: {},
	addition: false,
	showValidate: false,
	logged: false,
	res: '',
	source: '',
	personal: false,
	authenticate: false,
	company: false,
	contact: false,
	more_personal: false,
	email_disable: false,
	profile: false,
	admin_login: false,
	moreinfo: false,
	mytheme: true,
};
const MainProvider = createContext(initialState);
const MainContext = ({ children }) => {
	const [main, setMainContext] = useReducer(
		mainreducer,
		initialState,
	);
	let value = { main, setMainContext };
	return (
		<MainProvider.Provider value={value}>
			{children}
		</MainProvider.Provider>
	);
};

export default MainContext;

export const useMainContext = () => {
	const context = useContext(MainProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};
