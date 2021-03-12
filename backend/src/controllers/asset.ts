import { Request, Response } from "express";
const Asset = require("../models/Asset");
const AssetTrack = require("../models/AssetTrack");

exports.createAsset = async (req: Request, res: Response) => {
  const data_asset = {
    name: req.body.name,
    desc: req.body.desc,
    type: req.body.type,
    image_url: req.body.image_url,
    body: req.body.body,
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.timestamp,
  };

  const track_data_asset = {
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.timestamp,
  };

  const asset = new Asset(data_asset);

  await asset.save(async (err: any, result: any) => {
    if (err) {
      console.log(err);
      return res.status(422).json({
        data: {},
        errors: err.message,
      });
    }
    const asset_track = new AssetTrack({
      _id: result._id,
      track: [track_data_asset],
    });
    await asset_track.save((error: any, results: any) => {
      if (err) {
        return res.status(422).json({
          data: {},
          errors: error.message,
        });
      }
      return res.status(201).json({
        data: result,
        errors: {},
      });
    });
  });
};

exports.updateLocation = async (req: Request, res: Response) => {
  if (!req.body.lat || !req.body.lon || !req.body.timestamp) {
    return res.status(422).json({
      data: {},
      errors: "Lat, lon and timestamp are required",
    });
  }

  const asset_data = await Asset.updateOne(
    { _id: req.params.id },
    {
      $set: {
        lat: req.body.lat,
        lon: req.body.lon,
        timestamp: req.body.timestamp,
      },
    }
  );

  const track_data = await AssetTrack.updateOne(
    { _id: req.params.id },
    {
      $push: {
        track: {
          lat: req.body.lat,
          lon: req.body.lon,
          timestamp: req.body.timestamp,
        },
      },
    }
  );

  return res.status(200).json({
    data: {
      success: true,
    },
    errors: {},
  });
};

exports.getAssets = async (req: Request, res: Response) => {
  // console.log(req);
  const data = await Asset.find({});
  return res.status(200).json({
    data,
    errors: {},
  });
};

exports.getAsset = async (req: Request, res: Response) => {
  // console.log(req.query);
  const asset_data = await Asset.findOne({ _id: req.query._id }).exec();

  if (!asset_data) {
    return res.status(422).json({
      errors: "Asset does not exist",
    });
  }

  const track_data = await AssetTrack.findOne({ _id: req.query._id }).exec();

  return res.status(200).json({
    data: {
      asset_data,
      track: track_data,
    },
  });
};
