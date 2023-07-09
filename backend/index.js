const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getEmojis, searchEmoji } = require('./api/emojis.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/test', function (req, res) {
	res.send({
		msg: "OK!"
	});
});

app.post('/req/emojis/get', function (req, res) {
	getEmojis(req.body.host);
	res.send({
		msg: "OK!"
	});
});

app.post('/req/emojis/search', async function (req, res) {
	const result = await searchEmoji(req.body.query, req.body.host);
	res.send(result);
});

app.listen(process.env.PORT || 3000);