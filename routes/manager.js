const express = require("express");
const {
  createManager,
  updateManager,
  getManagerById,
} = require("../controllers/manager");
const { managerModel } = require("../models/manager");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../authentication/auth");
const { managerRole } = require("../authentication/managerRole");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
} = require("../controllers/customer");
const { customerModel } = require("../models/customer");
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  getUserAppointment,
} = require("../controllers/appointment");

const router = express();

// router.post("/", async (req, res, next) => {
//   try {
//     const newManager = await createManager(req.body);
//     console.log(newManager);
//     res.json(newManager);
//   } catch (error) {
//     res.status(401).send(error);
//   }
// });

router.patch("/", auth, managerRole, async function (req, res, next) {
  try {
    const myAccountId = req.userId;
    const updatedInfo = req.body;
    const updatedManager = await updateManager(myAccountId, updatedInfo);
    res.json(updatedManager);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get("/", auth, managerRole, async function (req, res) {
  try {
    const id = req.userId;
    const myAccountInfo = await getManagerById(id);
    res.json(myAccountInfo);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const manager = await managerModel.findOne({ username: username });
  if (manager) {
    let passwordString = password.toString();
    const validatePass = bcrypt.compareSync(passwordString, manager.password);
    if (validatePass) {
      const token = jwt.sign(
        {
          data: { username: username, userId: manager.id },
        },
        process.env.SECRET,
        { expiresIn: "20d" }
      );

      res.json(token);
    } else {
      res.status(401).json("Invalid credentials");
    }
  } else {
    res.status(401).json("Invalid credentials");
  }
});

router.post("/customer/", async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body);
    console.log(newCustomer);
    res.json(newCustomer);
  } catch (err) {
    res.status(409).send(err.message);
  }
});

router.patch("/customer/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const customerToUpdate = req.body;
    const updatedCustomer = await updateCustomer(id, customerToUpdate);
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/customer/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCustomer = await deleteCustomer(id);
    res.json(deletedCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/customer/", async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/customer/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getCustomerById(id);
    res.json(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/appointment/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const AppointmentToUpdate = req.body;
    const updatedAppointment = await updateAppointment(id, AppointmentToUpdate);
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/appointment/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const AppointmentToDelete = req.body;
    const deletedAppointment = await deleteAppointment(
      IDBTransaction,
      AppointmentToDelete
    );
    res.json(deletedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/appointment/", async (req, res) => {
  try {
    const appointmentCustomer = await getUserAppointment(req.customerId);
    const appointments = await getAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/appointment/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const Appointment = await getAppointmentById(id);
    res.json(Appointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
