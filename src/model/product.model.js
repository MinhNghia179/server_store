const connectDB = require("../app/connectDB");

const Product = function (product) {
  this.product_id = product.product_id;
  this.products_name = product.products_name;
  this.branh_id = product.branh_id;
  this.category_id = product.category_id;
  this.model_year = product.model_year;
  this.list_price = product.list_price;
  this.description = product.description;
};

Product.create = (newProduct, result) => {
  connectDB.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { product_id: res.product_id, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  const queryString = `SELECT * FROM products WHERE product_id = "${productId}"`;
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

Product.getAll = (result) => {
  const queryString = `SELECT * FROM products`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.delete = (productId, result) => {
  const queryString = `DELETE FROM products WHERE product_id = "${productId}"`;
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

Product.update = (productId, product, result) => {
  const queryString = `UPDATE products SET products_name = ?, category_id = ?, model_year = ?, list_price = ?, description = ?, color = ?
  WHERE product_id = "${productId}"`;
  connectDB.query(
    queryString,
    [
      product.products_name,
      product.category_id,
      product.model_year,
      product.list_price,
      product.description,
      product.color,
      productId,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.length == 0) {
        result({ msg: "Not Found" }, null);
        return;
      }
      result(null, { product_id: productId, ...product });
    }
  );
};
module.exports = Product;
