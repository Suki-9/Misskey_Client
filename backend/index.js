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

app.post('/req/emojis', function(req, res) {
    const host = req.body.host
    res.send({
        msg: "OK"
    })
})

app.listen(process.env.PORT || 3000)