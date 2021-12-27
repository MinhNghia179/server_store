const connectDB = require("../app/connectDB");

const Customer = function (customer) {
  this.customer_id = customer.customer_id;
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.phone = customer.phone;
  this.email = customer.email;
  this.street = customer.street;
  this.city = customer.city;
  this.state = customer.state;
  this.zip_code = customer.zip_code;
};

Customer.create = (newCustomer, result) => {
  connectDB.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { customer_id: res.customer_id, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  const queryString = `SELECT * FROM customers WHERE customer_id = "${customerId}"`;
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
  const queryString = `SELECT * FROM customers`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.delete = (customerId, result) => {
  const queryString = `DELETE FROM customers WHERE customer_id = "${customer_id}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.update = (customerId, customer, result) => {
  const queryString = `UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ?, street = ?, city = ?, state = ?, zip_code = ? WHERE customer_id = "${customerId}"`;
  connectDB.query(
    queryString,
    [
      customer.first_name,
      customer.last_name,
      customer.phone,
      customer.email,
      customer.street,
      customer.state,
      customer.zip_code,
      customerId
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { customer_id: customerId, ...customer });
    }
  );
};

module.exports = Customer;
