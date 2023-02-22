import axios from 'axios';
const baseUrl = 'https://gamebackend.onrender.com';
export const getStandings = async (
	standings,
	year,
	setLoading,
	setGame,
	subscribed,
) => {
	try {
		setLoading(true);
		let resp = await axios.get(
			`${baseUrl}/standings?season=${year}&league=${standings}`,
		);

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
