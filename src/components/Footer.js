import { useMainContext } from '../context/context_/MainContext';
import { useLocation } from 'react-router-dom';
const Footer = () => {
	const {
		main: { addition, showValidate },
	} = useMainContext();
	const location = useLocation();
	const admin_result = JSON.parse(localStorage.getItem('admin_log'));
	return (
		<>
			{!admin_result && (
				<>
					{location.pathname !== '/v2/:id' ? (
						<>
							{' '}
							{!showValidate && (
								<footer
									className="text-center "
									style={{ minHeight: '6vh' }}
								>
									<div
										className="text-center p-3"
										style={{
											backgroundColor: 'rgba(233, 340, 430, 0.8)',
										}}
									>
										© 2020 Copyright:
										<a className="text-dark">GameHubz.com</a>
									</div>
								</footer>
							)}
						</>
					) : (
						<div className="text-center py-2">
							<h6>&copy;Update Info</h6>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Footer;
