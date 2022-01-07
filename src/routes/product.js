const productController = require("../controller/product.controller");

module.exports = (app) => {
  app.get("/product", productController.getProduct);
  app.get("/product/:id/", productController.getProductById);
  app.delete("/product/delete/:id", productController.deleteProduct);
  app.post("/product/add", productController.addproduct);
  app.put("/product/update/:id", productController.updateProduct);
};
