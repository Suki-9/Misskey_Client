const express = require('express');
const app = express();

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
});

app.get('/miauth/authorize', async (req, res) => {
  if (req.query.host && req.query.session) {
    const host = req.query.host;
    const session = req.query.session;
    const result = await fetch(`${host}/api/miauth/${session}/check`, {
      method: 'POST'
    })
      .then((r) => r.json())
      .then(r => r)
      .catch(() => undefined);
    console.log(result);
    if (result) {
      res
        .status(200)
        .send(result);
    } else {
      res
        .status(500)
        .send({});
    }
  }
})

app.listen(3200, () => {
  console.log('Server started on port 3200');
});
