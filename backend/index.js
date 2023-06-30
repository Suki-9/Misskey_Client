const emojis = require('./api/emojis.js')

const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/test', function(req, res) {
    res.send({
        msg: "うぇぶさぁばぁです(笑)"
    })
})

app.post('/req/emojis/get', function(req, res) {
    emojis.get(req.body.host)
    res.send({
        msg: "OK!"
    })
})
app.post('/req/emojis/search', async function(req, res) {
    const result = await emojis.search(req.body.query,req.body.host);
    res.send(result)
})
app.listen(process.env.PORT || 3000)