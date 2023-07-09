export default {
	async search(query, host) {
		const res = await fetch("http://192.168.11.2:3000/req/emojis/search", {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: query,
				host: host,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			await this.get(host);
			return this.search(query, host);
		}

		return data;
	},

	async get(host) {
		const server = "192.168.11.2:3000";
		await fetch(`http://${server}/req/emojis/get`, {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				host: host,
			}),
		});
	},

	async parse(user_name, mainhost, attr) {
		const regex = /:.*:/g;
		const matches = user_name.match(regex);

		if (matches) {
			const emoji_urls = await this.search(matches, mainhost);
			user_name = user_name.replace(regex, (match) =>
				`<img class='${attr}_emoji' src='${emoji_urls[match]}'>`
			);
		}

		return user_name;
	},
};
