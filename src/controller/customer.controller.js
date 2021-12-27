const Customer = require("../model/customer.model");
const rndId = () => {
  return Math.random().toString(36).slice(2, 15);
};

exports.getCustomer = (req, res) => {
  Customer.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.getCustomerById = (req, res) => {
  Customer.getCustomerById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.deleteCustomer = (req, res) => {
  Customer.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.msg == CONTANTS.MESSAGE_ERROR.NOT_FOUND) {
        res.status(404).send({ message: CONTANTS.MESSAGE_ERROR.NOT_FOUND });
      } else {
        res.status(500).send({
          message: "Could not delete product",
        });
      }
    } else {
      res.status(200).send({ message: "Customer was deleted successfully!" });
    }
  });
};

exports.addCustomer = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Body data can not empty" });
  } else {
    const newCustomer = new Customer({
      customer_id: rndId(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
    });
    Customer.create(newCustomer, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating",
        });
      } else {
        res.status(200).send({ message: "Customer was added successfully!" });
      }
    });
  }
};

exports.updateCustomer = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Body data can not empty" });
  } else {
    const customerId = req.params.id;
    Customer.update(customerId, req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while updating",
        });
      } else {
        res.status(200).send({ message: "Customer was updated successfully!" });
      }
    });
  }
};
