const Product = require("../model/product.model");
const CONTANTS = require("../app/contants");

const rndId = () => {
  let rndStr = "prod";
  for (let i = 0; i <= 2; i++) {
    rndStr += Math.random().toString(36).substr(2, 9);
  }
  return rndStr;
};

exports.getProduct = (req, res) => {
  Product.getAll((err, data) => {
    if (err) {
      res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(CONTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.getProductById = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(CONTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.msg == CONTANTS.MESSAGE_ERROR.NOT_FOUND) {
        res
          .status(CONTANTS.STATUS_CODE.FAIL)
          .send({ message: CONTANTS.MESSAGE_ERROR.NOT_FOUND });
      } else {
        res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: "Could not delete product",
        });
      }
    } else {
      res
        .status(CONTANTS.STATUS_CODE.SUCCESS)
        .send({ message: "Product was deleted successfully!" });
    }
  });
};

exports.addproduct = (req, res) => {
  if (!req.body) {
    res
      .status(CONTANTS.STATUS_CODE.FAIL)
      .send({ message: "Body data can not empty" });
  } else {
    const newProduct = new Product({
      productId: rndId(),
      name: req.body.name,
      categoryId: req.body.categoryId,
      modelYear: req.body.modelYear,
      price: req.body.price,
      description: req.body.description,
      color: req.body.color,
      evaluate: req.body.evaluate,
      reviews: req.body.reviews,
      image: req.body.image,
    });
    Product.create(newProduct, (err, data) => {
      if (err) {
        res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: err.message || "Some error occurred while creating",
        });
      } else {
        res
          .status(CONTANTS.STATUS_CODE.SUCCESS)
          .send({ message: "Product was added successfully!" });
      }
    });
  }
};

exports.updateProduct = (req, res) => {
  if (!req.body) {
    res
      .status(CONTANTS.STATUS_CODE.FAIL)
      .send({ message: "Body data can not empty" });
  } else {
    const productId = req.params.id;
    Product.update(productId, req.body, (err, data) => {
      if (err) {
        res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: err.message || "Some error occurred while updating",
        });
      } else {
        res
          .status(CONTANTS.STATUS_CODE.SUCCESS)
          .send({ message: "Product was updated successfully!" });
      }
    });
  }
};
