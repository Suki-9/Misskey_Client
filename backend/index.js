const emojis = require('./api/emojis.js')

const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/api/miauth', function(req, res) {
    console.log("OK")
    res.send({
        body: {
            i: "hogehoge",
        }
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