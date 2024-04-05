const generateRandomString = (length: number = 8) => {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars.charAt(randomIndex);
	}

	return result;
};

export function sleep(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

export { generateRandomString };
