const customerController = require("../controller/customer.controller");

module.exports = (app) => {
  app.get("/customer", customerController.getCustomer);
  app.get("/customer/:id", customerController.getCustomerById);
  app.delete("/customer/delete/:id", customerController.deleteCustomer);
  app.post("/customer/add", customerController.addCustomer);
  app.put("/customer/update/:id", customerController.updateCustomer);
};
