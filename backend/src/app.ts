import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import mongoose from "mongoose";
import { authRoute } from "./routes/auth";
import { assetRoute } from "./routes/asset";

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());

//Required for making calls from localhost -- dev only
var cors = require('cors')
app.use(cors()) 

app.use("/api", assetRoute);
app.use("/auth", authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("hello");
});

//DATABASE
const databaseUrl =
  "mongodb+srv://chypsd:jumbotailgps5@mongoperul.hirgt.mongodb.net/Jumbotail";
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(8000, () => {
  console.log("Server is running");
});
