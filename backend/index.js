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
app.post('/req/emojis/search', function(req, res) {
    const result = emojis.search(req.body.query);
    //console.log(result)
    res.send({
        links: result
    })
})
app.listen(process.env.PORT || 3000)