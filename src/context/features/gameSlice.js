import axios from 'axios';
const baseUrl = 'https://gamebackend.onrender.com';
export const Game_Reg = async (
	player_data,
	setMode,
	loading,
	user,
	issuccess,

	setExtra,
	info,
) => {
	console.log('before' + info.current);
	const mygame = { player_data, info };
	try {
		const response = await axios.put(
			` ${baseUrl}/game/quickmatch/${user}`,
			mygame,
		);
		console.log(response);
		setTimeout(() => {
			setTimeout(() => {
				setMode({
					type: 'POST_COMPLETE',
					payload: {
						loading,
						success: '',
					},
				});
				setExtra({
					p1goals: '',
					p2goals: '',
					amount: '',
					paid: '',
					outcome: '',
					penalty_amount: '',
					best_amount: '',
				});
			}, 2000);
			setMode({
				type: 'POST',
				payload: {
					loading,
					success: response?.data?.message,
				},
			});
		}, 2000);
		setMode({
			type: 'POST_ERROR',
			loading,
		});
	} catch (error) {
		if (error?.response?.status === 500) {
			setMode({
				type: 'GAME_ERROR',
				error:
					'A problem Occured with our servers,connection will be back soon',
			});
		}
		setTimeout(() => {
			setMode({
				type: 'GAME_ERROR_COMPLETE',
				error: '',
			});
		}, 5000);
		setMode({
			type: 'GAME_ERROR',
			error: error?.response?.data?.message,
		});

		console.log(error?.response?.data?.message);
	}
};

export const getplayer = async (source, setGame) => {
	try {
		let response = await axios.get('/game', {
			cancelToken: source.token,
		});
		setGame({ type: 'LOAD_GAMES', payload: response.data.result });
	} catch (error) {
		setGame({ type: 'ERROR_GAMES' });
	} finally {
		setGame({ type: 'ERROR_GAMES' });
	}
};
