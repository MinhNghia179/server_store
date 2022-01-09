const connectDB = require("../app/connectDB");

const Customer = function (customer) {
  this.customerId = customer.customerId;
  this.firstName = customer.firstName;
  this.lastName = customer.lastName;
  this.phone = customer.phone;
  this.address = customer.address;
  this.email = customer.email;
  this.password = customer.password;
};

Customer.create = (newCustomer, result) => {
  connectDB.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { customerId: res.customerId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  const queryString = `SELECT * FROM customer WHERE customerId = "${customerId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ msg: "Not Found" }, null);
  });
};

Customer.getAll = (result) => {
  const queryString = `SELECT * FROM customer`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.delete = (customerId, result) => {
  const queryString = `DELETE FROM customer WHERE customerId = "${customerId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.update = (customerId, customer, result) => {
  const queryString = `UPDATE customer SET firstName = ?, lastName = ?, phone = ?, address = ?, email = ?, password = ? WHERE customerId = "${customerId}"`;
  connectDB.query(
    queryString,
    [
      customer.firstName,
      customer.lastName,
      customer.phone,
      customer.address,
      customer.email,
      customer.password,
      customerId
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { customerId: customerId, ...customer });
    }
  );
};

module.exports = Customer;
