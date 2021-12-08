const Product = require("../model/product.model");
const CONTANTS = require("../app/contants");
const rndId = () => {
  return Math.random().toString(36).slice(2, 15);
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
      product_id: rndId(),
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      colors: req.body.colors,
      company: req.body.company,
      description: req.body.description,
      category: req.body.category,
      shipping: req.body.shipping,
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
