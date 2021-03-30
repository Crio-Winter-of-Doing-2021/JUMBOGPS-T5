const app = require("./app");
import mongoose from "mongoose";

//DATABASE
export const databaseUrl =
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

//Host Server
app.listen(8000, () => {
  console.log("Server is running");
});

