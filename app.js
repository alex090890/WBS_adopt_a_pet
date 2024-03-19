const express = require('express')
const app = express()
const port = 8001
const pets = require('./petList');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})