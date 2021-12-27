const categoryController = require("../controller/category.controller");

module.exports = (app) => {
  app.get("/category", categoryController.getCategory);
  app.get("/category/:id", categoryController.getCategoryById);
};
