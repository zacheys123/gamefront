import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE;
export const getStandings = async (
	standings,
	year,
	setLoading,
	setGame,
	subscribed,
) => {
	const options = {
		method: 'GET',
		url: `${baseUrl}/standings`,
		params: { season: year, league: standings },
	};
	try {
		setLoading(true);
		let resp = await axios.request(options);
		if (!subscribed) {
			setGame({
				type: 'STANDINGS',
				payload: resp?.data?.response[0]?.league?.standings[0],
			});
		}

		setLoading(false);
	} catch (error) {
		console.log(error);
		setLoading(true);
	}
};
