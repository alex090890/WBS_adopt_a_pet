const express = require('express')
const app = express()
const port = 8001
const pets = require('./petList');

app.get('/', (req, res) => {
    res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend</p>
        <ul>
            <li>Dogs</li>
            <li>Cats</li>
            <li>Rabbits</li>
        </ul>
    `)
})

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})