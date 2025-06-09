export const extractMainDomain = (url: string) => {
	try {
		const parsedUrl = new URL(url);
		const hostParts = parsedUrl.hostname.split(".");

		let domain;
		if (hostParts.length > 2) {
			domain = hostParts[hostParts.length - 2];
		} else {
			domain = hostParts[0];
		}
		return domain.toUpperCase();
	} catch {
		console.error("Некорректный URL");
		return null;
	}
};
