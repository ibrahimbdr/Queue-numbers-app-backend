require("dotenv").config();
const express = require("express");
const customerRouter = require("./routes/customer");
const appointmentRouter = require("./routes/appointment");
const adminRouter = require("./routes/admin/admin");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.connect(`mongodb://localhost:27017/frontdesk`);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.use("/appointment", appointmentRouter);
app.use("/customer", customerRouter);
app.use("/admin", adminRouter);

app.use("*", (req, res, next) => {
  res.status(404).send("Page is Not Found");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
