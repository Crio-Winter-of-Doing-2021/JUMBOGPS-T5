"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var auth_1 = require("./routes/auth");
var asset_1 = require("./routes/asset");
var app = express_1["default"]();
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
app.use(express_1["default"].json());
//Required for making calls from localhost -- dev only
var cors = require('cors');
app.use(cors());
app.use("/api", asset_1.assetRoute);
app.use("/auth", auth_1.authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", function (req, res) {
    res.send("hello");
});
//DATABASE
var databaseUrl = "mongodb+srv://chypsd:jumbotailgps5@mongoperul.hirgt.mongodb.net/Jumbotail";
mongoose_1["default"]
    .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(function () {
    console.log("DB CONNECTED");
})["catch"](function (e) {
    console.log(e);
});
app.listen(8000, function () {
    console.log("Server is running");
});
