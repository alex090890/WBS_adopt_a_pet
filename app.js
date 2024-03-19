const express = require('express')
const app = express()
const port = 8001
const pets = require('./petList');

app.get('/', (req, res) => {
    res.send(`
        <div>
            <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend</p>
        <ul>
            <li><a href="/animals/dogs">Dogs</a></li>
            <li><a href="/animals/cats">Cats</a></li>
            <li><a href="/animals/rabbits">Rabbits</a></li>
        </ul>
        </div>
    `)
});

app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  if (pets[petType]) {
    let html = `<h1>List of ${petType}</h1><ul>`;
    pets[petType].forEach((pet, index) => {
        html += `<li><a href="/animals/${petType}/${index}">${pet.name} - ${pet.breed}</a></li>`;
    });
    html += '</ul>';
    res.send(html);
  } else {
    res.status(404).send(`<h1>Pet type not found</h1>`);
  }
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;
  if (pets[petType]) {
    const findPet = pets[petType][petId];
    if (findPet) {
      let html = `<h1>${findPet.name}</h1>`;
      html += `<img src="${findPet.url}" alt="${findPet.name}">`;
      html += `<p>${findPet.description}</p>`;
      html += `<ul><li>Breed: ${findPet.breed}</li><li>Age: ${findPet.age}</li></ul>`;
        html += `<a href="/">Go to the homepage</a>`;
      res.send(html);
    } else {
      res.status(404).send({ message: 'Pet not found' });
    }
  } else {
    res.status(404).send(`<h1>Pet type not found</h1><a href="/">Go to the homepage</a>`);
  }
});

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.listen(port, () => {
  console.log(`The website is listening on port ${port}`)
})