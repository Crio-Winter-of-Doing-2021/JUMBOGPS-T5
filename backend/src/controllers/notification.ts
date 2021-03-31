import { Request, Response } from "express";
const Notification = require("../models/Notification");


exports.getNotification = async (req: Request, res: Response)=>{
  
    const data = await Notification.findOne({_id: req.params.id}).exec()
    
    if (!data) {
      return res.status(422).json({
        error: { message: "Notification Id does not exist" },
      });
    }
    return res.status(200).json({
      data: data,
      error: {}
    })
  }