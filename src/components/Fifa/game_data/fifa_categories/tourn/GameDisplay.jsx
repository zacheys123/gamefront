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
	const getData = () => {
		let sortedvalues = games;
		sortedvalues = sortedvalues?.filter((data) => {
			if (data.type === '1st' || data.type2 === '1st') {
				return data;
			} else if (data.type === '2nd' || data.type2 === '2nd') {
				return data;
			} else if (
				data.type === 'quarter' ||
				data.type2 === 'quarter'
			) {
				return data;
			} else if (data.type === 'semi' || data.type2 === 'semi') {
				return data;
			} else if (data.type === 'finals' || data.type2 === 'finals') {
				return data;
			}
			return data;
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
								<span>{newdata.p1 || newdata.p3}</span>
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
								<span>{newdata.p2 || newdata.p4}</span>
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
