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

	const [headertourn, setheadertourn] = useState(() => {
		JSON.parse(localStorage.getItem('tournament')).map((data) => {
			if (data.type === '1st' || data.type2 === '1st') {
				return '1st Round';
			} else if (data.type === '2nd' || data.type2 === '2nd') {
				return '2nd Round';
			} else if (
				data.type === 'quarter' ||
				data.type2 === 'quarter'
			) {
				return 'Quarter Finals';
			} else if (data.type === 'semi' || data.type2 === '2nd') {
				return 'Semi Finals Round';
			} else if (data.type === 'finals' || data.type2 === '2nd') {
				return 'Finals';
			}
		});
	});

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
			} else if (data.type === 'semi' || data.type2 === '2nd') {
				return data;
			} else if (data.type === 'finals' || data.type2 === '2nd') {
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
						<h6>
							{newdata.type === '1st Round' ||
							newdata.type2 === '1st Round'
								? '1st Round'
								: newdata.type === '2nd' || newdata.type2 === '2nd'
								? '2nd Round'
								: newdata.type === 'quarter' ||
								  newdata.type2 === 'quarter'
								? 'Quarter Finals'
								: newdata.type === 'semi' || newdata.type2 === 'semi'
								? 'Semi Finals'
								: newdata.type === 'finals' ||
								  newdata.type2 === 'finals'
								? 'Finals'
								: 'Results'}
						</h6>{' '}
						<div className="list_name">
							<div className="results">
								<span>P1</span>{' '}
								<span>{newdata.p1 || newdata.p3}</span>
							</div>
							<div className="results">
								<span>P2</span>{' '}
								<span>{newdata.p2 || newdata.p4}</span>
							</div>
							<div className="results">
								<span>Type</span>{' '}
								<span>{newdata.type || newdata.type2}</span>
							</div>
							<div className="results">
								<span>Station</span>{' '}
								<span>{newdata.station || newdata.station2}</span>
							</div>
							<div className="results">
								<span>Winner</span>{' '}
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
