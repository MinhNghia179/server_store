const Category = require('../model/category.model');
const CONSTANTS = require('../app/CONSTANTS');

const rndId = () => {
  let rndStr = 'cago';
  for (let i = 0; i <= 2; i++) {
    rndStr += Math.random().toString(36).substr(2, 9);
  }
  return rndStr;
};

exports.getCategory = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || 'Some error occurred while retrieving...',
      });
    } else {
      res.status(CONSTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.getCategoryById = (req, res) => {
  Category.findById((err, data) => {
    if (err) {
      res.status(CONSTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || 'Some error occurred while retrieving...',
      });
    } else {
      res.status(CONSTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.addCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body data can not empty' });
  } else {
    const newCategory = new Category({
      categoryId: rndId(),
      name: req.body.name,
      description: req.body.description,
    });
    Category.create(newCategory, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating',
        });
      } else {
        res.status(200).send({ message: 'Category was added successfully!' });
      }
    });
  }
};
