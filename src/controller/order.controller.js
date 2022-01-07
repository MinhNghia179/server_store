const Order = require("../model/order.model");

const rndId = () => {
  let rndStr = "ord";
  for (let i = 0; i <= 2; i++) {
    rndStr += Math.random().toString(36).substr(2, 9);
  }
  return rndStr;
};

exports.getOrder = (req, res) => {
  Order.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.getOrderById = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.deleteOrder = (req, res) => {
  Order.delete(req.params.id, (err, data) => {
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

exports.addOrder = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Body data can not empty" });
  } else {
    const newOrder = new Order({
      order_id: rndId(),
      customerId: req.body.customerId,
      order_status: req.body.order_status,
      order_date: req.body.order_date,
      required_date: req.body.required_date,
      shipped_date: req.body.shipped_date,
      store_id: req.body.store_id,
      staff_id: req.body.staff_id
    });
    Order.create(newOrder, (err, data) => {
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
