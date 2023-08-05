const fs = require('fs');

const getEmojis = async (host) => {
	const emojis = await fetch(`https://${host}/api/emojis`)
		.then(response => response.json())
		.then(data => data.emojis);

	fs.writeFile(`./emoji_index/${host}_emojis.json`, JSON.stringify(emojis), (err) => {
		if (err) {
			return;
		}
	});

	const categories = [];
	const emoji_index = [];

	emojis.forEach(emoji => {
		const category = emoji.category;
		const search = categories.indexOf(category);

		if (search === -1) {
			categories.push(category);
			emoji_index.push([emoji]);
		} else {
			emoji_index[search].push(emoji);
		}
	});

	fs.writeFile(`./emoji_index/${host}_index_key.json`, JSON.stringify(categories), (err) => {
		if (err) {
			return;
		}
	});

	fs.writeFile(`./emoji_index/${host}_index.json`, JSON.stringify(emoji_index), (err) => {
		if (err) {
			return;
		}
	});
	return;
}

const searchEmoji = async (queries, host) => {
	const results = {};

	try {
		const index = JSON.parse(fs.readFileSync(`./emoji_index/${host}_emojis.json`, 'utf8'));
		index.forEach((item) => {
			queries.forEach((query) => {
				if (item.name === query.replace(":", "")) {
					const key = query;
					results[key] = item.url;
				}
			});
		});
		results.statusCode = 200;
	} catch (e) {
		await getEmojis(host);
		results.statusCode = 500;
		// results.error = "index error!";
	}

	return results;
};

module.exports = {
	getEmojis,
	searchEmoji
};