import {
	GTA,
	GOD_OF_WAR,
	FIFA,
	GHOST,
} from '../../context/types/gametypes';
export const fifa_action = (show, game) => {
	show((prev) => {
		if (prev) {
			return !prev;
		}
		return false;
	});
	setTimeout(() => {
		game({ type: FIFA });
	}, 2000);
};
export const Goa_action = (show, game) => {
	show((prev) => {
		if (prev) {
			return !prev;
		}
		return false;
	});
	setTimeout(() => {
		game({ type: GOD_OF_WAR });
	}, 2000);
};
export const Gta_action = (show, game) => {
	show((prev) => {
		if (prev) {
			return !prev;
		}
		return false;
	});
	setTimeout(() => {
		game({ type: GTA });
	}, 2000);
};
export const Ghost_action = (show, game) => {
	show((prev) => {
		if (prev) {
			return !prev;
		}
		return false;
	});
	setTimeout(() => {
		game({ type: GHOST });
	}, 2000);
};
