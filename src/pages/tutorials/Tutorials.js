import { useEffect, useRef, useState } from 'react';

import { useMainContext } from '../../context/context_/MainContext';
import './Tutorials.scss';
import { Box, Stack } from '@mui/material';
import Videos_Room from './Videos_Room';
import Video_func from './utils';
import videos from './vid';
import { useGameContext } from '../../context/context_/GameContext';

const Tutorials = () => {
	const {
		main: { mytheme },
		setMainContext,
	} = useMainContext();
	const {
		videos_state: {},
		setVideos,
	} = useGameContext();

	const istheme = JSON.parse(localStorage.getItem('theme'));
	const fifa = useRef();
	const god = useRef();
	const grand = useRef();
	const ghost = useRef();
	const most = useRef();
	const unchartered = useRef();
	const fort = useRef();
	const cod = useRef();
	const last = useRef();
	const mortal = useRef();

	// active functionality(access buttons/li)

	const gameref = {
		fifa,
		god,
		grand,
		ghost,
		most,
		unchartered,
		fort,
		cod,
		last,
		mortal,
	};
	const [loading, setLoading] = useState(false);

	return (
		<div
			className={!istheme ? 'tutorial__container' : 'darkmode '}
			onClick={() => {
				setMainContext({ type: 'PROFILECHANGE' });
				setMainContext({ type: 'GAMECHANGE' });
				setMainContext({ type: 'REMOVE_THEME', payload: mytheme });
			}}
		>
			<Box className=" game__cont">
				<Box className="list_games">
					<ul>
						<li
							ref={fifa}
							onClick={(ev) =>
								Video_func().getFifa(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Fifa
						</li>
						<li
							ref={god}
							onClick={(ev) =>
								Video_func().getGodWar(ev, gameref, setLoading)
							}
						>
							God Of War
						</li>
						<li
							ref={grand}
							onClick={(ev) =>
								Video_func().getGrand(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Grand Theft Auto
						</li>
						<li
							ref={ghost}
							onClick={(ev) =>
								Video_func().getGhost(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Ghost Recon
						</li>
						<li
							ref={most}
							onClick={(ev) =>
								Video_func().getMost(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Most Wanted
						</li>
						<li
							ref={unchartered}
							onClick={(ev) =>
								Video_func().getUnchartered(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Unchartered
						</li>
						<li
							ref={fort}
							onClick={(ev) =>
								Video_func().getFort(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Fortnite
						</li>
						<li
							ref={cod}
							onClick={(ev) =>
								Video_func().getCod(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Call Of Duty
						</li>
						<li
							ref={last}
							onClick={(ev) =>
								Video_func().getLast(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							The Last Of Us
						</li>
						<li
							ref={mortal}
							onClick={(ev) =>
								Video_func().getMortal(
									ev,
									gameref,
									setLoading,
									setVideos,
								)
							}
						>
							Mortal Kombat
						</li>
					</ul>
				</Box>
			</Box>
			<Box className="videos">
				<Videos_Room loading={loading} />
			</Box>
		</div>
	);
};

export default Tutorials;
