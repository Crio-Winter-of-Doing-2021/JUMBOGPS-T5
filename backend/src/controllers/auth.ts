import { Request, Response } from "express";
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password";
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;
  let hash_password = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: hash_password,
  });
  await user.save(async (err: any) => {
    if (err) {
      return res.status(422).json({
        errors: err.message,
      });
    }
    return res.status(201).json({
      name: user.name,
      email: user.email,
      token: await sign(user.email),
    });
  });
};

exports.login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email }, async (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({
        errors: "No user with this email exists",
      });
    }
    const passwordMatch = await matchPassword(user.password!, password);

    if (passwordMatch == false) {
      return res.status(401).json({
        errors: "Wrong password",
      });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      token: await sign(email),
    });
  });
};

exports.getUser = async(req: Request, res: Response)=>{

  let data = (req as any).email
  User.findOne({email: data.email}, (err:any, user:any)=>{
    if (err || !user) {
      return res.status(401).json({
        errors: "No user with this email exists",
      });
    }
    return res.status(200).json({
      email: user.email,
      name: user.name
    })
  })

}