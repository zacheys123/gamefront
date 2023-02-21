import { useState, useEffect, useRef } from 'react';

const GameDisplay = ({ record }) => {
	const [games, setGames] = useState([]);
	const [games2, setGames2] = useState([]);

	const players = useRef();
	const [final_data, setFinalData] = useState({});

	useEffect(() => {
		players.current = final_data;
	}, [final_data]);
	useEffect(() => {
		const storedvalues = JSON.parse(
			localStorage.getItem('tournament1'),
		);
		if (!storedvalues) {
			setGames([]);
		}

		setGames(storedvalues);
	}, [record]);
	useEffect(() => {
		const storedvalues2 = JSON.parse(
			localStorage.getItem('tournament2'),
		);
		if (!storedvalues2) {
			setGames2([]);
		}
		setGames2(storedvalues2);
	}, [record]);

	const [head, setHead] = useState('Results');
	const leftref = useRef();
	const rightref = useRef();
	const getData1 = () => {
		let sortedvalues = games;
		sortedvalues = sortedvalues?.filter((data, index) => {
			if (data.type === '1st_Round') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			} else if (data.type === '2nd_Round') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			} else if (data.type === 'Quarter_Finals(1)') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			} else if (data.type === 'Quarter_Finals(2)') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			} else if (data.type === 'Semi_Finals') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			} else if (data.type === 'Finals') {
				const { p3, p4, type2, station2, winner2, ...alldata } = data;

				return alldata;
			}
		});
		return sortedvalues;
	};
	const getData2 = () => {
		let sortedvalues2 = games2;

		sortedvalues2 = sortedvalues2?.filter((data, index) => {
			if (data.type2 === '1st_Round') {
				return data;
			} else if (data.type2 === '2nd_Round') {
				return data;
			} else if (data.type2 === 'Quarter_Finals(1)') {
				return data;
			} else if (data.type2 === 'Quarter_Finals(2)') {
				return data;
			} else if (data.type2 === 'Semi_Finals') {
				return data;
			} else if (data.type2 === 'Finals') {
				return data;
			}
		});
		return sortedvalues2;
	};

	useEffect(() => {
		let sorted = JSON.parse(localStorage.getItem('tournament'));
		let sorted2 = JSON.parse(localStorage.getItem('tournament2'));
	}, []);
	return (
		<div className="right">
			<div className="list1">
				<h4 style={{ textAlign: 'center', marginTop: '.6rem' }}>
					Station1 Results
				</h4>

				{getData1()?.map((newdata, idx) => {
					return (
						<div key={idx} className="listname_left" ref={leftref}>
							<>
								{' '}
								<div className="results">
									<span
										style={{ color: 'orangered', fontWeight: 'bold' }}
									>
										{newdata.type}
									</span>
								</div>
								<div className="results">
									<span>{newdata.p1}</span>
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
									<span>{newdata.p2}</span>
								</div>
								<div className="results">
									<span>{newdata.station}</span>
								</div>
								<div className="results">
									<span style={{ color: 'green' }}>
										{newdata.winner}(won)
									</span>

									<br />
								</div>
							</>
						</div>
					);
				})}
			</div>
			<div className="list2">
				<h4 style={{ textAlign: 'center', marginTop: '.6rem' }}>
					Station2 Results
				</h4>
				{getData2()?.map((newdata, idx) => {
					return (
						<div className="listname_right" key={idx} ref={rightref}>
							{' '}
							<div className="results">
								<span
									style={{ color: 'orangered', fontWeight: 'bold' }}
								>
									{newdata.type2}
								</span>
							</div>
							<div className="results">
								<span>{newdata.p3}</span>
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
								<span>{newdata.p4}</span>
							</div>
							<div className="results">
								<span>{newdata.station2}</span>
							</div>
							<div className="results">
								<span style={{ color: 'green' }}>
									{newdata.winner2}(won)
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GameDisplay;
