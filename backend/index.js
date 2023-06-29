const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.get('/test', function(req, res) {
    res.send({
        msg: "うぇぶさぁばぁです(笑)"
    })
})

app.listen(process.env.PORT || 3000)