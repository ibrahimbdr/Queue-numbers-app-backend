require("dotenv").config();
const express = require("express");
const customerRouter = require('./routes/customer');
const appointmentRouter = require('./routes/appointment');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect(`mongodb://localhost:27017/frontdesk/`);
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/appointment', appointmentRouter);
app.use('/customer', customerRouter);

app.use("*", (req, res, next) => {
    res.status(404).send("Page is Not Found");
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`);
});