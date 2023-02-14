import axios from 'axios';
const baseUrl = 'https://gaminbackendz.onrender.com';
export const Game_Reg = async (
	player_data,
	setMode,
	loading,
	user,
	issuccess,
	info,
) => {
	console.log('before' + info.current);
	const mygame = { player_data, info };
	try {
		await axios.put(` ${baseUrl}/game/quickmatch/${user}`, mygame);
		console.log('after' + player_data);
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
					success: 'Game has been recorded successfully',
				},
			});
		}, 2000);
		setMode({
			type: 'POST_ERROR',
			loading,
		});
	} catch (error) {
		setMode({ type: 'POST_ERROR', loading });
		console.log(error.message);
	} finally {
		setMode({ type: 'POST_ERROR', loading });
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
