const connectDB = require('../app/connectDB');

const Product = function (product) {
  this.id = product.id; //
  this.name = product.name; //
  this.price = product.price;
  this.size = product.size;
  this.status = product.status;
  this.trademark = product.trademark;
  this.main_stone = product.main_stone;
  this.main_color_stone = product.main_color_stone;
  this.shape = product.shape;
  this.sex = product.sex;
  this.weight = product.weight;
  this.description = product.description;
};

Product.create = (newProduct, result) => {
  connectDB.query('INSERT INTO product SET ?', newProduct, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.id, ...newProduct });
  });
};

Product.findById = (id, result) => {
  // const queryString = `SELECT pr.*,cate.nameCa,cate.descriptionCa
  // FROM product as pr
  // INNER JOIN category as cate
  // ON pr.categoryId = cate.categoryId WHERE id = "${id}"`;

  const queryString = `SELECT * FROM product WHERE id = "${id}"`;

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

Product.getAll = (result) => {
  // const queryString = `SELECT pr.*,cate.nameCa,cate.descriptionCa
  // FROM product as pr
  // INNER JOIN category as cate
  // ON pr.categoryId = cate.categoryId`;

  const queryString = `SELECT * FROM product`;

  connectDB.query(queryString, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.delete = (id, result) => {
  const queryString = `DELETE FROM product WHERE id = "${id}"`;

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

Product.update = (id, product, result) => {
  const queryString = `UPDATE product SET name = ?, price = ?, size = ?, status = ?,trademark = ?, main_stone = ?, main_color_stone = ?, shape = ?, sex = ?, weight = ?, description = ?
  WHERE id = "${id}"`;

  connectDB.query(
    queryString,
    [
      product.name,
      product.price,
      product.size,
      product.status,
      product.trademark,
      product.main_stone,
      product.main_color_stone,
      product.shape,
      product.sex,
      product.weight,
      product.description,
      id,
    ],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.length == 0) {
        result({ msg: 'Not Found' }, null);
        return;
      }
      result(null, { id: id, ...product });
    }
  );
};
module.exports = Product;
