const express = require("express");
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  getLastAppoinment,
  getUserAppointment,
} = require("../controllers/appointment");
const { appointmentModel } = require("../models/appointment");
const { auth } = require("../authentication/auth");

const router = express();

router.post("/", auth, async (req, res) => {
  try {
    // const appointmentCustomer = await getUserAppointment(req.userId);
    // console.log(appointmentCustomer.customer.id);
    // if (appointmentCustomer != undefined) {
    //   const appointmentCustomer = await getUserAppointment(req.userId);
    //   res.json(appointmentCustomer);
    // } else {
    const lastAppointment = await getLastAppoinment();
    let newAppointment = {};
    if (lastAppointment !== null) {
      newAppointment = await createAppointment({
        number: Number(lastAppointment.number) + 1,
        customer: req.userId,
      });
    } else {
      newAppointment = await createAppointment({
        number: 1,
        customer: req.userId,
      });
    }
    let Appointment = await appointmentModel
      .findById(newAppointment.id)
      .populate("customer", "name");
    console.log(Appointment);
    res.json(Appointment);
    // }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const AppointmentToUpdate = req.body;
    const updatedAppointment = await updateAppointment(id, AppointmentToUpdate);
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const AppointmentToDelete = req.body;
    const deletedAppointment = await deleteAppointment(id);
    res.json(deletedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const appointmentCustomer = await getUserAppointment(req.userId);
    res.json(appointmentCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const Appointment = await getAppointmentById(id);
    res.json(Appointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
