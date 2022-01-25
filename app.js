const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) MIDDLEWARE

app.use(morgan("dev"));

// MIDDLEWARE - modify the incomming data
app.use(express.json());

// Next is always the 3rd option. We can call it whatever we want
app.use((req, res, next) => {
  console.log("Hello from the middleware!!");
  // we have to call next() to continue the cicle
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello rom the server side!", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

// Read data before routing!!

// ROUTES

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// SAME AS ABOVE BUT CLEANER

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
