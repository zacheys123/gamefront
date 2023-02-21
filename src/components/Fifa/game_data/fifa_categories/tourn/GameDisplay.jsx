import { useState, useEffect, useRef } from 'react';

const GameDisplay = ({ record }) => {
	const [games, setGames] = useState([]);

	const players = useRef();
	const [final_data, setFinalData] = useState({});

	useEffect(() => {
		players.current = final_data;
	}, [final_data]);
	useEffect(() => {
		const storedvalues = JSON.parse(
			localStorage.getItem('tournament'),
		);
		if (!storedvalues) {
			setGames([]);
		}
		setGames(storedvalues);
	}, [record]);

	const [head, setHead] = useState('Results');
	console.log(games);
	const getData = () => {
		let sortedvalues = games;
		sortedvalues = sortedvalues?.filter((data) => {
			if (data.type === '1st_Round' || data.type2 === '1st_Round') {
				return data;
			} else if (
				data.type === '2nd_Round' ||
				data.type2 === '2nd_Round'
			) {
				return data;
			} else if (
				data.type === 'Quarter_Finals(1)' ||
				data.type2 === 'Quarter_Finals(1)'
			) {
				return data;
			} else if (
				data.type === 'Quarter_Finals(2)' ||
				data.type2 === 'Quarter_Finals(2)'
			) {
				return data;
			} else if (
				data.type === 'Semi_Finals' ||
				data.type2 === 'Semi_Finals'
			) {
				return data;
			} else if (data.type === 'Finals' || data.type2 === 'Finals') {
				return data;
			}
		});
		return sortedvalues;
	};
	return (
		<div className="right">
			{getData()?.map((newdata, idx) => {
				return (
					<div key={idx} className="list">
						<h6> {newdata.type}</h6>

						<div className="list_name">
							<div className="results">
								<span>
									{newdata.p1 ? newdata.p1 : '' ? newdata.p3 : ''}
								</span>
							</div>
							<span
								style={{
									color: 'red',
									fontWeight: 'bold',
									fontFamily: 'ariel',
								}}
							>
								v/s
							</span>
							<div className="results">
								<span>{newdata.p2 ? newdata.p2 : newdata.p4}</span>
							</div>
							<div className="results">
								<span>{newdata.type || newdata.type2}</span>
							</div>
							<div className="results">
								<span>{newdata.station || newdata.station2}</span>
							</div>
							<div className="results">
								<span style={{ color: 'green' }}>
									{newdata.winner || newdata.winner2}(won)
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default GameDisplay;
