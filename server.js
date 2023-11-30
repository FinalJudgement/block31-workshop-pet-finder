const express = require("express");
const app = express();

const pets = require("./data.js");

const getAppointments = (aptArr) => {
  return aptArr
    .map((apt) => {
      return `
      <p>Date: ${apt.date}</p>
      <p>time: ${apt.time}</p>
      <p>reason: ${apt.reason}</p>
    `;
    })
    .join();
};

const populatePetCards = (info) => {
  return info
    .map((obj) => {
      return `
    <div>
      <h2>${obj.name}</h2>
      <p>Breed: ${obj.breed}</p>
      <p>Age: ${obj.age}</p>
      <p>Owner: ${obj.owner}</p>
      <p>Telephone: ${obj.telephone}</p>
      <div>
      <h3> Appointments: </h3>
      ${getAppointments(obj.appointments)}
      </div>
    </div>
  `;
    })
    .join();
};

app.get("/api/v1/pets", (req, res) => {
  res.send(populatePetCards(pets));
});

app.get("/api/v1/pets/owner", (req, res) => {
  const { name } = req.query;
  const ownersPet = pets.filter(
    (pet) => pet.owner.toLowerCase() === name.toLowerCase()
  );
  console.log(ownersPet);

  if (ownersPet) {
    res.send(populatePetCards(ownersPet));
  } else {
    res.send(`<h3>There is no owner with that name in our database</h3>`);
  }
});

app.get("/api/v1/pets/:name", (req, res) => {
  const pet = pets.find(
    (pet) => pet.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (pet) {
    res.send(`
    <div>
        <h2>${pet.name}</h2>
        <p>Breed: ${pet.breed}</p>
        <p>Age: ${pet.age}</p>
        <p>Owner: ${pet.owner}</p>
        <p>Telephone: ${pet.telephone}</p>
        <div>
        <h3> Appointments: </h3>
        ${getAppointments(pet.appointments)}
        </div>
      </div>
    `);
  } else {
    res.send(`<h3>This pet is not in our database</h3>`);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
