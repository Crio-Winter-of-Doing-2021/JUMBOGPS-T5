import { Request, Response } from "express";
const Asset = require("../models/Asset");
const AssetTrack = require("../models/AssetTrack");
var mongoose = require('mongoose');

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
        error: err.message,
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
          error: error.message,
        });
      }
      return res.status(201).json({
        data: result,
        error: {},
      });
    });
  });
};

exports.updateLocation = async (req: Request, res: Response) => {
  if (!req.body.lat || !req.body.lon || !req.body.timestamp) {
    return res.status(422).json({
      data: {},
      error: "Lat, lon and timestamp are required",
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
    error: {},
  });
};

exports.getAssets = async (req: Request, res: Response) => {
  let data = null;

  if (req.query.type) {
    data = await Asset.find({ type: req.query.type }).limit(100);
  } else {
    data = await Asset.find({});
  }

  if (data.length!==0) {
    return res.status(200).json({
      data,
      error: {},
    });
  }
  else {
    return res.status(200).json({
      data,
      error: {
        "message": "Type is wrong"
      },
    });
  }
};

exports.getAsset = async (req: Request, res: Response) => {
  const asset_data = await Asset.findOne({ _id: req.params._id }).exec();
  if (!asset_data) {
    return res.status(422).json({
      error: "Asset does not exist",
    });
  }
  const track_data = await AssetTrack.findOne({ _id: req.params._id }).exec();

  return res.status(200).json({
    data: {
      asset_data,
      track: track_data.track,
    },
    error: {},
  });
};



exports.getAssetByTime = async (req: Request, res: Response) => {
  const asset_data = await Asset.findOne({ _id: req.params._id }).exec();
  if (!asset_data) {
    return res.status(422).json({
      error: "Asset does not exist",
    });
  }
  // const track_data = await AssetTrack.findOne(
  //   { _id: req.params._id },
  //   {
  //     track: {
  //       $elemMatch: {
  //         timestamp: {
  //           $gte: new Date(String(req.query.start)),
  //           $lte: new Date(String(req.query.end)),
  //         },
  //       },
  //     },
  //   }
  // ).exec();

  const track_data = await AssetTrack.findOne(
    { _id: req.params._id } ,
    {
      track: {$filter: {
          input: '$track',
          as: 'item',
          cond:{ "$and": [ 
            { "$gte": [ "$$item.timestamp", new Date(String(req.query.start)) ] },
            { "$lte": [  "$$item.timestamp", new Date(String(req.query.end)) ] }
        ]}
      }
  }},
  );
  // console.log("track_data");
  // console.log(track_data);

  return res.status(200).json({
    data: {
      asset_data,
      track: track_data.track,
    },
    error: {},
  });
};
