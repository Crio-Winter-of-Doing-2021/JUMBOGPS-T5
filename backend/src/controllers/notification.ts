import { Request, Response } from "express";
const Notification = require("../models/Notification");
var mongoose = require("mongoose");

exports.getNotificationById = async (req: Request, res: Response) => {
  const data = await Notification.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $addFields: {
        "track.name": "$name",
        "track.assetId": "$_id",
      },
    },
    {
      $project: {
        track: "$track",
      },
    },
  ]);

  if (!data) {
    return res.status(422).json({
      error: { message: "Notification Id does not exist" },
    });
  }
  return res.status(200).json({
    data: data.length === 0 ? data : data[0].track,
    error: {},
  });
};

exports.getAllNotification = async (req: Request, res: Response) => {
  const data = await Notification.aggregate([
    {
      $addFields: {
        "track.name": "$name",
        "track.assetId": "$_id",
      },
    },
    {
      $group: {
        _id: null,
        track: { $push: "$track" },
      },
    },
    {
      $project: {
        _id: 0,
        track: {
          $reduce: {
            input: "$track",
            initialValue: [],
            in: {
              $concatArrays: ["$$value", "$$this"],
            },
          },
        },
      },
    },
  ]);

  return res.status(200).json({
    data: data.length === 0 ? data : data[0].track,
    error: {},
  });
};


export const markSeen = async (assetId:string,id:string,email:string) => {
  const track_data = await Notification.updateOne(
    { _id: assetId, "track._id": id },
    { $addToSet: { "track.$.seenBy": email } },
  );
}

exports.getNotify = async (req: Request, res: Response) => {
  // console.log(io);
  // const data = {
  //   _id:"sadda",
  //   name: "Hello",
  //   type: "geofence",
  //   status: "success",
  //   time:"2001-03-12T12:41:48.872Z",
  //   lat: 24.3,
  //   lon: 80.13,
  //   seenBy:[]
  // };
  // io.emit("notification", data);
  // return res.status(200).json({
  //   data: "notify",
  //   error: {}
  // })
  exports.getAllNotification(req, res);
};
