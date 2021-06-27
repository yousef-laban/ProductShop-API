//
const express = require("express");
const cors = require("cors");

//Routes
const productsRoutes = require("./routes/productsRoutes");
//Creat App Instence
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/products", productsRoutes);
app.use("/media", express.static("media"));

const db = require("./db/models");
db.sequelize.sync();

// Path not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
