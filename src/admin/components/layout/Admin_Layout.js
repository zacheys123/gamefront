import Admin_Header from '../Admin_Header';
import Footer from '../Footer';
import { Box } from '@mui/material';
import Sidebar from '../homepage/Sidebar';
import './Layout.css';
import { useAdminContext } from '../../../context/context_/AdminContext';
import Dashboard from '../../Dashboard';
function Admin_Layout({ children }) {
	const {
		admin_state: { istheme },
		admin_dispatch,
	} = useAdminContext();
	return (
		<div className={istheme ? 'admin_layout bg-dark' : 'bg-light'}>
			<Admin_Header />
			<Box className="admin__body">
				{' '}
				<Box className="left_body">
					<Sidebar />
				</Box>
				<Box className="children">{children}</Box>
			</Box>

			<Footer />
		</div>
	);
}
export default Admin_Layout;
