const fs = require("fs");
const express = require("express");

const app = express();

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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
