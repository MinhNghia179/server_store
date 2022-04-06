const orderController = require("../controller/order.controller");

module.exports = (app) => {
  app.get("/order", orderController.getOrder);
  app.get("/order/:id", orderController.getOrderById);
  app.delete("/order/delete/:id", orderController.deleteOrder);
  app.post("/order/add", orderController.addOrder);
};
