const Customer = require('../model/customer.model');

const rndId = () => {
  let rndStr = 'custm';
  for (let i = 0; i <= 2; i++) {
    rndStr += Math.random().toString(36).substr(2, 9);
  }
  return rndStr;
};

exports.getCustomer = (req, res) => {
  Customer.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving...',
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
        message: err.message || 'Some error occurred while retrieving...',
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.deleteCustomer = (req, res) => {
  Customer.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.msg == CONSTANTS.MESSAGE_ERROR.NOT_FOUND) {
        res.status(404).send({ message: CONSTANTS.MESSAGE_ERROR.NOT_FOUND });
      } else {
        res.status(500).send({
          message: 'Could not delete product',
        });
      }
    } else {
      res.status(200).send({ message: 'Customer was deleted successfully!' });
    }
  });
};

exports.addCustomer = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body data can not empty' });
  } else {
    const newCustomer = new Customer({
      customerId: rndId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    });
    Customer.create(newCustomer, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating',
        });
      } else {
        res.status(200).send({ message: 'Customer was added successfully!' });
      }
    });
  }
};

exports.updateCustomer = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body data can not empty' });
  } else {
    const customerId = req.params.id;
    Customer.update(customerId, req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating',
        });
      } else {
        res.status(200).send({ message: 'Customer was updated successfully!' });
      }
    });
  }
};
