const connectDB = require("../app/connectDB");

const Order = function (order) {
  this.order_id = order.order_id;
  this.customerId = order.customerId;
  this.order_status = order.order_status;
  this.order_date = order.order_date;
  this.required_date = order.required_date;
  this.shipped_date = order.shipped_date;
  this.store_id = order.store_id;
  this.staff_id = order.staff_id;
};

Order.create = (newOrder, result) => {
  connectDB.query("INSERT INTO order SET ?", newOrder, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { order_id: res.order_id, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  const queryString = `SELECT * FROM order WHERE order_id = "${orderId}"`;
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
  const queryString = `DELETE FROM order WHERE order_id = "${orderId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Order.update = (orderId, order, result) => {
  const queryString = `UPDATE order SET customerId = ?, order_status = ?, order_date = ?, required_date = ?, shipped_date = ?, store_id = ?, staff_id = ? WHERE orderId = "${orderId}"`;
  connectDB.query(
    queryString,
    [
      order.customerId,
      order.order_status,
      order.order_date,
      order.required_date,
      order.shipped_date,
      order.store_id,
      order.staff_id,
      orderId,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { order_id: orderId, ...order });
    }
  );
};

module.exports = Order;
