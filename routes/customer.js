const express = require('express');
const { createCustomer, updateCustomer, deleteCustomer, getCustomers, getCustomerById, getCustomerByPhone } = require('../controllers/customer');
const { customerModel } = require('../models/customer');
const { auth } = require('../authentication/auth');
const jwt = require('jsonwebtoken');

const router = express();


router.post('/', async(req, res) => {
    try{
        const newCustomer = await createCustomer(req.body);
        console.log(newCustomer)
        res.json(newCustomer);
    }catch(err){
        res.status(401).send(err.message);
    }
})

router.post('/login', async(req, res) => {
    try{
        const { name, phone } = req.body;
        const customer = await customerModel.findOne({name: name, phone: phone});
        if(customer){
            const token = jwt.sign({
                data: {name: customer.name, phone: customer.phone, customerId: customer.id}
            }, process.env.SECRET)
            customer.token = token;
            res.send(customer);
        }else{
            res.status(403).send("Invalid Authentication");
        }
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const customerToUpdate = req.body;
        const updatedCustomer = await updateCustomer(id, customerToUpdate);
        res.json(updatedCustomer);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const customerToDelete = req.body;
        const deletedCustomer = await deleteCustomer(IDBTransaction, customerToDelete);
        res.json(deletedCustomer);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', auth, async(req, res) => {
    try{
        if(req.body.phone != null)
        {
            const customer = await getCustomerByPhone(req.body.phone);
            res.json(customer);
        }
        else
        {
            const customers = await getCustomers();
            res.json(customers);
        }
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/:id', auth, async(req, res) => {
    try{
        const id = req.params.id;
        const customer = await getCustomerById(id);
        res.json(customer);
    }catch(err){
        res.status(500).send(err.message);
    }
})





module.exports = router;
