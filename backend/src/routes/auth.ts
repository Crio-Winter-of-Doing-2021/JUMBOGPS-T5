import { Router } from "express";
import { authByToken } from "../middleware/auth";
const { check } = require("express-validator");
const { signup, login, getUser } = require("../controllers/auth");

const route = Router();

route.post(
  "/signup",
  [
    // check("name")
    //   .isLength({ min: 5 })
    //   .withMessage("Name should be atleast 5 characters"),
    check("email").isEmail().withMessage("Email is Invalid"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password should be atleast 3 characters"),
  ],
  signup
);

route.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is Invalid"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password should be atleast 3 characters"),
  ],
  login
);

route.get("/signout", async (req, res) => {
  res.send("signout");
});

route.get('/getuser', authByToken, getUser)

export const authRoute = route;
