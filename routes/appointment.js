const express = require('express');
const { createAppointment, updateAppointment, deleteAppointment, getAppointmentById, getAppointments, getUserAppointment } = require('../controllers/appointment');
const { auth } = require('../authentication/auth');

const router = express();


router.post('/', auth, async(req, res) => {
    try{
        const appointmentCustomer = await getUserAppointment(req.customerId);
        // console.log(appointmentCustomer.customer.id);
        if(appointmentCustomer!=undefined){
            res.json("You already have an appointment");
        }else{
            const allAppointments = await getAppointments();
            console.log(allAppointments);
            let newAppointment = {};
            if(allAppointments.length > 0){
                const lastAppointment = Number(allAppointments[allAppointments.length - 1].number);
                newAppointment = await createAppointment({number: lastAppointment+1, customer: req.customerId});
            }else{
                newAppointment = await createAppointment({number: 1, customer: req.customerId});
            }
            console.log(newAppointment)
            res.json(newAppointment);
        }
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
        const appointmentCustomer = await getUserAppointment(req.customerId);
        res.json(appointmentCustomer);
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
