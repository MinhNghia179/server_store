const Category = require("../model/category.model");
const CONTANTS = require("../app/contants");

const rndId = () => {
  return Math.random().toString(36).slice(2, 15);
};

exports.getCategory = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(CONTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};

exports.getCategoryById = (req, res) => {
  Category.findById((err, data) => {
    if (err) {
      res.status(CONTANTS.STATUS_CODE.SERVER_ERROR).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    } else {
      res.status(CONTANTS.STATUS_CODE.SUCCESS).send(data);
    }
  });
};
