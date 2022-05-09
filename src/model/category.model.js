const connectDB = require('../app/connectDB');

const Category = function (category) {
  this.categoryId = category.categoryId;
  this.name = category.name;
  this.description = category.description;
};

Category.getAll = (result) => {
  const queryString = `SELECT * FROM category`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length == 0) {
      result({ msg: 'Not Found' }, null);
    }
    result(null, res);
  });
};

Category.findById = (categoryId) => {
  const queryString = `SELECT * FROM category WHERE categoryId = "${categoryId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ msg: 'Not Found' }, null);
  });
};

Category.create = (newCategory, result) => {
  connectDB.query('INSERT INTO category SET ?', newCategory, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { categoryId: res.categoryId, ...newCategory });
  });
};

module.exports = Category;
