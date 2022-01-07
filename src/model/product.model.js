const connectDB = require("../app/connectDB");

const Product = function (product) {
  this.productId = product.productId;
  this.name = product.name;
  this.categoryId = product.categoryId;
  this.modelYear = product.modelYear;
  this.price = product.price;
  this.description = product.description;
  this.color = product.color;
  this.evaluate = product.evaluate;
  this.reviews = product.reviews;
  this.image = product.image;
};

Product.create = (newProduct, result) => {
  connectDB.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { productId: res.productId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  const queryString = `SELECT * FROM product WHERE product_id = "${productId}"`;
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
  const queryString = `SELECT * FROM product`;
  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.delete = (productId, result) => {
  const queryString = `DELETE FROM product WHERE productId = "${productId}"`;
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
  const queryString = `UPDATE product SET name = ?, categoryId = ?, modelYear = ?, price = ?, description = ?, color = ?, evaluate = ?, reviews = ?, image = ?
  WHERE productId = "${productId}"`;
  connectDB.query(
    queryString,
    [
      product.name,
      product.categoryId,
      product.modelYear,
      product.price,
      product.description,
      product.color,
      product.evaluate,
      product.reviews,
      product.image,
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
      result(null, { productId: productId, ...product });
    }
  );
};
module.exports = Product;
