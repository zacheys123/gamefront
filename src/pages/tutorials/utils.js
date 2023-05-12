import { useGameContext } from '../../context/context_/GameContext';
import { FIFA, GHOST, MORTAL } from '../../context/types/videos_type';
import {
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
} from './tutorial_reducer';
const Video_func = () => {
	const details = {
		getFifa: (ev, ref_object, setLoading, setVideos) => {
			ev.preventDefault();
			fifa(ref_object);
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setVideos({ type: FIFA });
			}, 3000);
		},
		getGodWar: (ev, ref_object) => {
			ev.preventDefault();

			god(ref_object);
		},
		getGrand: (ev, ref_object) => {
			ev.preventDefault();
			grand(ref_object);
		},
		getGhost: (ev, ref_object, setLoading, setVideos) => {
			ev.preventDefault();
			ghost(ref_object);

			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setVideos({ type: GHOST });
			}, 3000);
		},
		getMost: (ev, ref_object) => {
			ev.preventDefault();
			most(ref_object);
		},
		getCod: (ev, ref_object) => {
			ev.preventDefault();
			cod(ref_object);
		},
		getUnchartered: (ev, ref_object) => {
			ev.preventDefault();
			unchartered(ref_object);
		},
		getFort: (ev, ref_object) => {
			ev.preventDefault();
			fort(ref_object);
		},
		getLast: (ev, ref_object) => {
			ev.preventDefault();
			last(ref_object);
		},
		getMortal: (ev, ref_object, setLoading, setVideos) => {
			ev.preventDefault();
			mortal(ref_object);

			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setVideos({ type: MORTAL });
			}, 3000);
		},
	};

	return details;
};
export default Video_func;
