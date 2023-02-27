// importing all the dependencies and middlewares
require("dotenv").config();
const express = require("express");
const customerRouter = require("./routes/customer");
const appointmentRouter = require("./routes/appointment");
const adminRouter = require("./routes/admin/admin");
const managerRouter = require("./routes/manager");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// connecting to the database "MongoDB" server
mongoose.connect(`mongodb://localhost:27017/queue-app`);

// handling cors for allowing requests between front and back
const options = {
  origin: "*", // should be modified to the front end origin, for multiple origins add array ['origin1', 'origin2', ...]
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // allowed rest requests from client
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

app.use(express.json());

// all the routes should be called from the middleware.
app.use("/appointment", appointmentRouter);
app.use("/customer", customerRouter);
app.use("/admin", adminRouter);
app.use("/manager", managerRouter);

app.use("*", (req, res, next) => {
  res.status(404).send("Page is Not Found");
});

// listenning to the node server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
