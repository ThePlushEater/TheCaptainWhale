export function linear (t, b, c, d) {
	return c * t / d + b;
};

export function easeInOutQuad (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c/2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

export function easeInOutCubic (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t * t + b;
	t -= 2;
	return c / 2 * (t * t * t + 2) + b;
};

export function easeOutQuad (t, b, c, d) {
	t /= d;
	return -c * t * (t - 2) + b;
};
