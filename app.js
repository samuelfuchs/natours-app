const fs = require("fs");
const express = require("express");

const app = express();

// MIDDLEWARE - modify the incomming data
app.use(express.json());

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello rom the server side!", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

// Read data before routing!!
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    // It's good practice to send the total amount of results, but not NECESSARY
    results: tours.length,
    data: {
      // We could write only 'tours', without ': tours'
      tours: tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  // assigns automatically the requesto to ":id"
  console.log(req.params);

  // convert id to string
  // when multiplying by 1 it turns it into a number!!!
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// Create a new tour - it's the SAME route as GET request
app.post("/api/v1/tours", (req, res) => {
  //   console.log(req.body);
  // 1st figure out the ID of object
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // STATUS 201 = created OK
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
