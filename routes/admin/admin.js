const express = require("express");
const {
  createAdmin,
  updateAdmin,
  getAdminById,
} = require("../../controllers/admin");
const { adminModel } = require("../../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../../authentication/auth");
const { adminRole } = require("../../authentication/admin/adminRole");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
} = require("../../controllers/customer");
const { customerModel } = require("../../models/customer");
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  getUserAppointment,
} = require("../../controllers/appointment");
const {
  createManager,
  getManagerById,
  getManagers,
} = require("../../controllers/manager");
const { createShop, updateShop, getShop } = require("../../controllers/shop");

const router = express();

router.post("/", async (req, res, next) => {
  try {
    const newAdmin = await createAdmin(req.body);
    console.log(newAdmin);
    res.json(newAdmin);
  } catch (error) {
    res.status(409).send(error);
  }
});

router.get("/checkmaching/", async (req, res, next) => {
  try {
    const existingAdmins = await adminModel.find();
    console.log(existingAdmins);
    res.json(existingAdmins);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/", auth, adminRole, async function (req, res, next) {
  try {
    const myAccountId = req.userId;
    const updatedInfo = req.body;
    const updatedAdmin = await updateAdmin(myAccountId, updatedInfo);
    res.json(updatedAdmin);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get("/", auth, adminRole, async function (req, res) {
  try {
    console.log(req.userId);
    const id = req.userId;
    const myAccountInfo = await getAdminById(id);
    res.json(myAccountInfo);
  } catch (err) {
    res.status(422).send(err);
  }
});

////////////////////////////////////////////////////////////////
router.post("/shop", async (req, res, next) => {
  try {
    const newShop = await createShop({ shopName: "My Shop" });
    console.log(newShop);
    res.json(newShop);
  } catch (error) {
    res.status(401).send(error);
  }
});

router.patch("/shop/:id", auth, adminRole, async function (req, res, next) {
  try {
    const myShopId = req.params.id;
    const newShopData = req.body;
    console.log(req.body);
    const updatedShop = await updateShop(myShopId, newShopData);
    res.json(updatedShop);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get("/shop/", async function (req, res) {
  try {
    const myShop = await getShop();
    res.json(myShop);
  } catch (err) {
    res.status(422).send(err);
  }
});
////////////////////////////////////////////////////////////////////////

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const admin = await adminModel.findOne({ username: username });
  console.log(admin.id);
  if (admin) {
    let passwordString = password.toString();
    const validatePass = bcrypt.compareSync(passwordString, admin.password);
    if (validatePass) {
      const token = jwt.sign(
        {
          data: { username: username, userId: admin.id },
        },
        process.env.SECRET,
        { expiresIn: "20d" }
      );
      console.log({ username: username, userId: admin.id });
      res.json(token);
    } else {
      res.status(401).json("Invalid credentials");
    }
  } else {
    res.status(401).json("Invalid credentials");
  }
});

router.post("/manager", async (req, res, next) => {
  try {
    const newManager = await createManager(req.body);
    console.log(newManager);
    res.json(newManager);
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/manager", async (req, res, next) => {
  try {
    const managers = await getManagers();
    console.log(managers);
    res.json(managers);
  } catch (error) {
    res.status(401).send(error);
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
    const deletedAppointment = await deleteAppointment(id);
    res.json(deletedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/appointment/", async (req, res) => {
  try {
    const appointmentCustomer = await getUserAppointment(req.userId);
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
