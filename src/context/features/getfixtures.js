import axios from 'axios';
const baseUrl = 'https://gamebackend.onrender.com';
export const getFixtures = async (
	date,
	setLoading,
	setGame,
	year,
	standings,
) => {
	const options = {
		method: 'GET',
		url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',

		params: standings
			? { date: date, league: standings, season: year }
			: { date: date, season: year },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_FIXTURES,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
		},
	};
	try {
		setLoading(true);
		let resp = await axios.request(options);
		setGame({
			type: 'FIXTURES',
			payload: resp?.data?.response,
		});

		setLoading(false);
	} catch (error) {
		if (axios.isCancel(error)) console.log('cancelled');
		console.log(error);
		setLoading(true);
	}
};
