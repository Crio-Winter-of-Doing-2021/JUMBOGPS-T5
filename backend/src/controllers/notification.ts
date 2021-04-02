import { Request, Response } from "express";
const Notification = require("../models/Notification");
var mongoose = require("mongoose");

exports.getNotificationById = async (req: Request, res: Response) => {
  const data = await Notification.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id) },
    },
    { //add fields in each element of track
      $addFields: {
        "track.name": "$name",
        "track.assetId": "$_id",
      },
    },
    {
      $project: {
        track: "$track",
      },
    },//sort track based on timestamp
    { $unwind: "$track" },
    { $sort: { "track.timestamp": -1 } },
    { $group: { _id: "$_id", track: { $push: "$track" } } },
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
    { //add fields in each element of track
      $addFields: {
        "track.name": "$name",
        "track.assetId": "$_id",
      },
    },
    { //[track1,track2]
      $group: {
        _id: null,
        track: { $push: "$track" },
      },
    },
    { // concat all nested array into single array
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
    //sort track based on timestamp
    { $unwind: "$track" },
    { $sort: { "track.timestamp": -1 } },
    { $group: { _id: "$_id", track: { $push: "$track" } } },
  ]);

  return res.status(200).json({
    data: data.length === 0 ? data : data[0].track,
    error: {},
  });
};

export const markSeen = async (assetId: string, id: string, email: string) => {
  const track_data = await Notification.updateOne(
    { _id: assetId, "track._id": id },
    { $addToSet: { "track.$.seenBy": email } }
  );
};
