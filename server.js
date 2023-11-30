const express = require("express");
const app = express();

const pets = require("./data.js");

app.get("/api/v1/pets", (req, res) => {
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
  const petList = pets
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
  res.send(petList);
});

app.get("/api/v1/pets/:name", (req, res) => {
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

  const nameMatch = () => {
    return pets.find(
      (pet) => pet.name.toLowerCase() === req.params.name.toLowerCase()
    );
  };
  console.log(pets);
  console.log(nameMatch());
  if (nameMatch()) {
    res.send(`
    <div>
        <h2>${nameMatch().name}</h2>
        <p>Breed: ${nameMatch().breed}</p>
        <p>Age: ${nameMatch().age}</p>
        <p>Owner: ${nameMatch().owner}</p>
        <p>Telephone: ${nameMatch().telephone}</p>
        <div>
        <h3> Appointments: </h3>
        ${getAppointments(nameMatch().appointments)}
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
