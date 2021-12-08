const connectDB = require("../app/connectDB");
const product = require("../routes/product/product");

const Product = function (product) {
  this.product_id = product.product_id;
  this.name = product.name;
  this.price = product.price;
  this.image = product.image;
  this.colors = product.colors;
  this.company = product.company;
  this.description = product.description;
  this.category = product.category;
  this.shipping = product.shipping;
};

Product.create = (newProduct, result) => {
  connectDB.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { product_id: res.product_id, ...newProduct });
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
  const queryString = `DELETE FROM product WHERE product_id = "${productId}"`;
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
  const queryString = `UPDATE product SET name = ?, price = ?, image = ?, colors = ?, company = ?, description = ?, category = ?, shipping = ? 
  WHERE product_id = "${productId}"`;
  connectDB.query(
    queryString,
    [
      product.name,
      product.price,
      product.image,
      product.colors,
      product.company,
      product.description,
      product.category,
      product.shipping,
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
