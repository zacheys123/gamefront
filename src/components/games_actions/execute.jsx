export const fifa_action = (show, game) => {
	show((prev) => {
		if (prev) {
			return !prev;
		}
		return false;
	});
	setTimeout(() => {
		game({ type: 'FIFA' });
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
		game({ type: 'GOD_OF_WAR' });
	}, 2000);
};
