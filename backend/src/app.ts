import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import { authRoute } from "./routes/auth";
import { assetRoute } from "./routes/asset";
import {userRoute} from "./routes/user"

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());

//Required for making calls from localhost -- dev only
var cors = require('cors')
app.use(cors()) 

app.use("/api", assetRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("hello");
});


module.exports = app;
