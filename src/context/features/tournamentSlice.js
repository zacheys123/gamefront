import {
	TOURNAMENT,
	TOURNAMENT_ERROR,
	POINTS,
	ELIMINATION,
	LOADING,
	ERROR_COMPLETE,
} from '../types/tournament_type';
import axios from 'axios';
const baseUrl = 'http://localhost:3500';
export const submitTourn = async (data, id, dispatch) => {
	try {
		const response = await axios.put(
			`${baseUrl}/game/tournament/${id}`,
			data.current,
		);

		setTimeout(() => {
			setTimeout(() => {
				if (data?.current?.type === 'points') {
					dispatch({ type: POINTS });
				} else if (data?.current?.type === 'elimination') {
					dispatch({ type: ELIMINATION });
				} else {
					return;
				}
			}, 3000);
			dispatch({ type: LOADING });

			setTimeout(() => {
				dispatch({
					type: TOURNAMENT,
					success: response?.data?.message,
				});
			}, 1000);
		}, 5000);
		dispatch({ type: LOADING });
	} catch (error) {
		console.log(error?.response?.data?.message);
		setTimeout(() => {
			dispatch({ type: ERROR_COMPLETE });
		}, 4000);

		dispatch({
			type: TOURNAMENT_ERROR,
			error: error?.response?.data?.message,
		});
		dispatch({ type: LOADING });
	}
};
