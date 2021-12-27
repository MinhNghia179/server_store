const connectDB = require("../app/connectDB");

const Category = function (category) {
  this.category_id = category.category_id;
  this.category_name = category.category_name;
};

Category.getAll = (result) => {
  const queryString = `SELECT * FROM categories`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length == 0) {
      result({ msg: "Not Found" }, null);
    }
    result(null, res);
  });
};

Category.findById = (categoryId) => {
  const queryString = `SELECT * FROM categories WHERE category_id = "${categoryId}"`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ msg: "Not Found" }, null);
  });
};


module.exports = Category;