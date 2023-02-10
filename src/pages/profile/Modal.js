import { useEffect } from 'react';
import { motion } from 'framer-motion';
const Modal = ({
	closemodal,
	modalcontent,
	success,
	error,
	marginBottom,
	marginTop,
	marginLeft,
	width,
}) => {
	useEffect(() => {
		setTimeout(() => {
			closemodal();
		}, 5000);
	}, []);
	return (
		<motion.div
			style={{
				position: 'absolute ',
				width: '40%',
				zIndex: 999,
				marginTop: marginBottom,
				marginTop: marginTop,
				marginLeft: marginLeft,
				width: width,
			}}
			initial={{ y: '40px', opacity: 0 }}
			animate={{
				y: '50px',
				opacity: 1,
				transition: { duration: 0.6 },
			}}
		>
			{success && (
				<div className="alert alert-success text-center">
					{modalcontent}
				</div>
			)}
			{error && (
				<div className="alert alert-danger text-center">
					{modalcontent}
				</div>
			)}
		</motion.div>
	);
};

export default Modal;
