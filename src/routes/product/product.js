const productController = require("../../controller/product.controller");

module.exports = (app) => {
  app.get("/products", productController.getProduct);
  app.get("/products/:id/", productController.getProductById);
  app.delete("/products/delete/:id", productController.deleteProduct);
  app.post("/products/add", productController.addproduct);
  app.put("/products/update/:id", productController.updateProduct);
};
