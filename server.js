const express = require("express");
const { createServer } = require("http");
const connectDB = require("./config/db_connect");
const logger = require("morgan");
const cors = require("cors");
const productRouter = require("./routes/api/productRoutes");
const categoriesRouter = require("./routes/api/categoriesRoutes");

const server = express();
const formatsLogger = server.get("env") === "development" ? "dev" : "short";

console.log("123");

server.use(express.static("public"));
server.use(logger(formatsLogger));
server.use(cors());
server.use(express.json());

server.use("/api/products", productRouter);

server.use("/api/categories", categoriesRouter);

server.use((err, req, res, next) => {
   const { status = 500, message = "Server error" } = err;
   res.status(status).json({
      message,
   });
});

connectDB();

const port = process.env.PORT || 3000;
createServer(server).listen(port, (err) => {
   if (err) throw err;
   console.log(`> Ready on http://localhost:${port}`);
});
