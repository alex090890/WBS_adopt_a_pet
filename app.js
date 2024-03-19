const express = require('express')
const app = express()
const port = 8001
const pets = require('./petList');

app.get('/', (req, res) => {
    res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend</p>
        <ul>
            <li><a href="/animals/dogs">Dogs</a></li>
            <li><a href="/animals/cats">Cats</a></li>
            <li><a href="/animals/rabbits">Rabbits</a></li>
        </ul>
    `)
});
app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  if (pets[petType]) {
    let html = `<h1>List of ${petType}</h1><ul>`;
    pets[petType].forEach(pet => {
        html += `<li>${pet.name} - ${pet.breed}</li>`;
    });
    html += '</ul>';
    res.send(html);
  } else {
    res.status(404).send({ message: 'Pet type not found' });
  }
});

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})