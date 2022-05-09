const Product = require('../model/product.model');
const CONSTANTS = require('../app/CONSTANTS');

const convertStrToArray = (value) => {
  const arrStr = (value && value.toString().split(',')) || [];

  return arrStr.map((item) => parseInt(item));
};

const rndId = () => {
  let rndStr = 'prod';
  for (let i = 0; i <= 2; i++) {
    rndStr += Math.random().toString(36).substr(2, 9);
  }
  return rndStr;
};

exports.getProduct = (req, res) => {
  Product.getAll((err, data) => {
    if (err) {
      res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || 'Some error occurred while retrieving...',
      });
    } else {
      data.forEach((item) => {
        item.size = convertStrToArray(item.size);
        item.images = (item.images && item.images.split(',')) || [];
      });

      res.status(CONSTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.getProductById = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || 'Some error occurred while retrieving...',
      });
    } else {
      res.status(CONSTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.msg == CONSTANTS.MESSAGE_ERROR.NOT_FOUND) {
        res
          .status(CONSTANTS.STATUS_CODE.FAIL)
          .send({ message: CONSTANTS.MESSAGE_ERROR.NOT_FOUND });
      } else {
        res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: 'Could not delete product',
        });
      }
    } else {
      res
        .status(CONSTANTS.STATUS_CODE.SUCCESS)
        .send({ message: 'Product was deleted successfully!' });
    }
  });
};

exports.addproduct = (req, res) => {
  if (!req.body) {
    res
      .status(CONSTANTS.STATUS_CODE.FAIL)
      .send({ message: 'Body data can not empty' });
  } else {
    const newProduct = new Product({
      id: rndId(),
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      status: req.body.status,
      trademark: req.body.trademark,
      main_stone: req.body.main_stone,
      main_color_stone: req.body.main_color_stone,
      shape: req.body.shape,
      gender: req.body.gender,
      weight: req.body.weight,
      description: req.body.description,
      images: req.body.images,
      reviews: req.body.reviews,
      stars: req.body.stars,
    });
    Product.create(newProduct, (err, data) => {
      if (err) {
        res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: err.message || 'Some error occurred while creating',
        });
      } else {
        res
          .status(CONSTANTS.STATUS_CODE.SUCCESS)
          .send({ message: 'Product was added successfully!' });
      }
    });
  }
};

exports.updateProduct = (req, res) => {
  if (!req.body) {
    res
      .status(CONSTANTS.STATUS_CODE.FAIL)
      .send({ message: 'Body data can not empty' });
  } else {
    const id = req.params.id;
    Product.update(id, req.body, (err, data) => {
      if (err) {
        res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
          message: err.message || 'Some error occurred while updating',
        });
      } else {
        res
          .status(CONSTANTS.STATUS_CODE.SUCCESS)
          .send({ message: 'Product was updated successfully!' });
      }
    });
  }
};
