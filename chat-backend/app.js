import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

import apiRoutes from "./src/routes/api";
import apiMiddleware from "./src/middleware/apiAuth";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
require("./src/config/sequelize");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiMiddleware, apiRoutes);
app.use(errorHandler);

module.exports = app;
