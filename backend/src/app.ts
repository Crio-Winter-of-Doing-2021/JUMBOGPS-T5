import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import { authRoute } from "./routes/auth";
import { assetRoute } from "./routes/asset";
import {userRoute} from "./routes/user"
import { markSeen } from "./controllers/notification";

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

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

io.on('connection',function  (socket:any) {

  socket.on("notification", ({assetId,id,email}: { assetId: string; id: string; email: string }  )=> {
      console.log(assetId,id,email);
      //add email in notification's sendBy in Db
      markSeen(assetId,id,email);
  });
  
});

http.listen(8001, function() {
  console.log('listening on port 8001');
});

module.exports = app;
export {http};
export {io};
