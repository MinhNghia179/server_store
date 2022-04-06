const connectDB = require("../app/connectDB");

const Order = function (order) {
  this.orderId = order.orderId;
  this.customerId = order.customerId;
  this.listProduct = order.listProduct;
  this.price = order.price;
  this.createDate = order.createDate;
  this.status = order.status;
  this.currency = order.currency;
};

Order.create = (newOrder, result) => {
  connectDB.query("INSERT INTO order SET ?", newOrder, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { orderId: res.orderId, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  const queryString = `SELECT * FROM order WHERE orderId = "${orderId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      ;
      result(null, res[0]);
      return;
    }
    result({ msg: "Not Found" }, null);
  });
};

Order.getAll = (result) => {
  const queryString = `SELECT * FROM order`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Order.delete = (orderId, result) => {
  const queryString = `DELETE FROM order WHERE orderId = "${orderId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Order.update = (orderId, order, result) => {
  const queryString = `UPDATE order SET customerId = ?, listProduct = ?, price = ?, createDate = ?, 	status = ?, currency = ?, WHERE orderId = "${orderId}"`;
  connectDB.query(
    queryString,
    [
      order.customerId,
      order.listProduct,
      order.price,
      order.createDate,
      order.status,
      order.currency,
      orderId,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { orderId: orderId, ...order });
    }
  );
};

module.exports = Order;
