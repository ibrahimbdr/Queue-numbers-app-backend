const express = require('express');
const { createAppointment, updateAppointment, deleteAppointment, getAppointmentById, getAppointments, getUserAppointment } = require('../controllers/appointment');
const { auth } = require('../authentication/auth');

const router = express();


router.post('/', auth, async(req, res) => {
    try{
        const newAppointment = await createAppointment(req.body);
        console.log(newAppointment)
        res.json(newAppointment);
    }catch(err){
        res.status(401).send(err.message);
    }
})


router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const AppointmentToUpdate = req.body;
        const updatedAppointment = await updateAppointment(id, AppointmentToUpdate);
        res.json(updatedAppointment);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const AppointmentToDelete = req.body;
        const deletedAppointment = await deleteAppointment(IDBTransaction, AppointmentToDelete);
        res.json(deletedAppointment);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', auth, async(req, res) => {
    try{
        if (req.body.number != null)
        {
            const appointmentUser = await getUserAppointment(req.body.number);
            res.json(appointmentUser);
        }
        else
        {
            const Appointments = await getAppointments();
            res.json(Appointments);
        }
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/:id', auth, async(req, res) => {
    try{
        const id = req.params.id;
        const Appointment = await getAppointmentById(id);
        res.json(Appointment);
    }catch(err){
        res.status(500).send(err.message);
    }
})





module.exports = router;
