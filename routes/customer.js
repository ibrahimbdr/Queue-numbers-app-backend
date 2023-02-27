const express = require("express");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
} = require("../controllers/customer");
const { customerModel } = require("../models/customer");
const { auth } = require("../authentication/auth");
const jwt = require("jsonwebtoken");

const router = express();

router.post("/", async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body);
    console.log(newCustomer);
    res.json(newCustomer);
  } catch (err) {
    res.status(409).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone } = req.body;
    const customer = await customerModel.findOne({ phone: phone });
    if (customer) {
      const token = jwt.sign(
        {
          data: {
            name: customer.name,
            phone: customer.phone,
            userId: customer.id,
          },
        },
        process.env.SECRET
      );
      customer.token = token;
      res.send(customer);
    } else {
      res.status(403).send("Invalid Authentication");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    // if (req.body.phone != null) {
    //   const customer = await getCustomerByPhone(req.body.phone);
    //   res.json(customer.phone);
    // } else {
    const customers = await getCustomers();
    res.json(customers);
    // }
  } catch (err) {
    res.status(403).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getCustomerByPhone(id);
    res.json(customer.phone);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
