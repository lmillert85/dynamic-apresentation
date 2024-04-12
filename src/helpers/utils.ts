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

export function generateFileName() {	
	const currentDate = new Date();
	const currentDayOfMonth = currentDate.getDate();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const currentHour = currentDate.getHours();
	const currentMinutes = currentDate.getMinutes();
	const currentSeconds = currentDate.getSeconds();
	return `${currentYear}${currentMonth}${currentDayOfMonth}${currentHour}${currentMinutes}${currentSeconds}`;
}

export function b64toBlob(base64Data: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
  }

export { generateRandomString };
