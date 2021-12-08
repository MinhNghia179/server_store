const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./src/app/connectDB");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/routes/product/product")(app);

app.listen(port, () => console.log(`Listing on port ${port}`));