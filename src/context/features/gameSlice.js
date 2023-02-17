import axios from 'axios';
const baseUrl = 'http://localhost:3500';
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
		console.log(response?.data);
		setTimeout(() => {
			setTimeout(() => {
				setMode({
					type: 'POST_COMPLETE',
					payload: {
						loading,
						success: '',
					},
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
		setMode({
			type: 'GAME_ERROR',
			error: error?.response?.data?.message,
		});
		setMode({
			type: 'GAME_ERROR_COMPLETE',
			error: '',
		});
		console.log(error?.response?.status);
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
