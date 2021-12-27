const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./src/app/connectDB");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/routes/product")(app);
require("./src/routes/category")(app);
require("./src/routes/customer")(app);
require("./src/routes/order")(app);

app.listen(port, () => console.log(`Listing on port ${port}`));